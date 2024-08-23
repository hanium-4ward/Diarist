import json, os, re, sys
from datetime import datetime

import django
from celery import shared_task
from confluent_kafka import Producer
from openai import OpenAI
from deep_translator import GoogleTranslator
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

sys.path.append('/app/')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings
from django.utils import timezone
from diary.models import Diary, User, Emotion, Image, Artist
from diary.utils.s3_uploader import S3ImgUploader
from diary.utils.redis_lock import distributed_lock

KAFKA_BROKER_URL = settings.KAFKA_BROKER_URL
CREATE_DIARY_TOPIC = settings.KAFKA_TOPIC_CREATE
RESPONSE_DIARY_TOPIC = settings.KAFKA_TOPIC_RESPONSE
GROUP_ID = settings.KAFKA_CREATE_GROUP
OPENAI_API_KEY = settings.OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)


stop_words_list = stopwords.words('english')

def translate_text(text, src='ko', dest='en'):
    '''
    텍스트 번역
    '''
    translated = GoogleTranslator(source=src, target=dest).translate(text)
    return translated


def clean_token(token):
    '''
    정규 표현식을 사용해 불필요한 문장 부호 제거
    '''
    token = re.sub(r'\W+', '', token)
    return token


def extract_keywords(text):
    '''
    불필요한 조사 제거 및 키워드 추출
    '''
    word_tokens = word_tokenize(text.lower())
    result = []

    for w in word_tokens:
        if w not in stop_words_list and clean_token(w) != '':
            result.append(w)
    return result


def generate_image(diary_text, artist_style, emotion, artist_prompt, example_picture):
    '''
    DALL-E 3를 사용하여 설명(description)에 기반한 이미지 생성
    '''
    keywords = extract_keywords(diary_text)
    translated_diary_text = translate_text(diary_text)
    translated_emotion = translate_text(emotion)

    base_prompt = (
        f"Generate a detailed and image focusing on the landscape, objects, and atmosphere described in the diary entry: '{translated_diary_text}'. "
    )

    style_prompt = (
        f"Accurately reflect the style of {artist_style}, incorporating key characteristics such as color palette, brush strokes, composition, lighting, and texture unique to this artist. "
        f"Create an artwork that evokes the feeling and style of the example artwork: {example_picture}. "
        f"The style should reflect the following description: {artist_prompt}. "
    )
    
    detailed_prompt = (
        f"Focus on emphasizing the essential elements mentioned in the diary, including: {keywords}. but do not include any word or text in the image. "
        f"Ensure the image captures the essence of the diary entry without adding any additional details or elements not present in the text. "
        f"Use a color scheme and lighting that reflects the mood of '{translated_emotion}', creating an ambiance that resonates with the diary's tone. "
        f"Avoid including any people in the image, and strictly adhere to copyright and content policies."
    )

    query = f"{base_prompt} {style_prompt} {detailed_prompt}"

    response = client.images.generate(
        model="dall-e-3",
        prompt=query,
        size="1024x1024",
        quality="standard",
        n=1
    )
    return response.data[0].url


def send_response(user_id, diary_id):
    '''
    Kafka에 create-diary 토픽으로 메세지 전송
    '''
    producer = Producer({'bootstrap.servers': KAFKA_BROKER_URL})
    response_message = json.dumps({"diary_id": diary_id, "user_id": user_id})
    producer.produce(RESPONSE_DIARY_TOPIC, key=str(diary_id), value=response_message)
    producer.flush()

@shared_task
def process_message(data):
    '''
    사용자에게 입력받은 일기 데이터를 통해 그림이미지 생성 및 저장로직
    '''
    try:
        print(f"Received message: {data}")

        user_id = data['user_id']
        emotion_id = data['emotion_id']
        artist_id = data['artist_id']
        diary_date = datetime.strptime(data['diary_date'], '%Y-%m-%d')
        content = data['content']

        artist = Artist.objects.get(artist_id=artist_id)
        emotion = Emotion.objects.get(emotion_id=emotion_id)

        # description = generate_description(content, artist.artist_name, emotion.emotion_name)
        image_url = generate_image(content, artist.artist_name, emotion.emotion_name, artist.artist_prompt, artist.example_picture)
        
        print(f"Generated image URL: {image_url}")

        # S3 lock
        lock_name_s3 = f"lock:s3-access"
        with distributed_lock(lock_name_s3):
            s3_url = S3ImgUploader.upload_from_url(image_url)

            if not s3_url:
                raise Exception("Failed to upload image to S3")

        # RDS lock
        lock_name_rds = f"lock:rds-access"
        with distributed_lock(lock_name_rds):
            image = Image.objects.create(image_url=s3_url)
            user = User.objects.get(user_id=user_id)

            new_diary = Diary(
                user=user,
                diary_date=diary_date,
                content=content,
                emotion=emotion,
                artist=artist,
                image=image
            )
            new_diary.save()

        send_response(user_id, new_diary.diary_id)

    
    except Diary.DoesNotExist:
        return f"Diary for user {user_id} on {diary_date} does not exist."
    except User.DoesNotExist:
        return f"User with id {user_id} does not exist."
    except Artist.DoesNotExist:
        return f"Artist with id {artist_id} does not exist."
    except Emotion.DoesNotExist:
        return f"Emotion with id {emotion_id} does not exist."
    except KeyError as e:
        return f"Missing key in message: {e}"
    except json.JSONDecodeError as e:
        return f"Error decoding JSON: {e}"
    except Exception as e:
        return f"Error processing message: {e}"

@shared_task
def re_process_message(data):
    '''
    사용자에게 입력받은 일기 데이터를 통해 그림이미지 재생성 및 저장로직
    '''
    try:
        print(f"Received message: {data}")

        user_id = data['user_id']
        emotion_id = data['emotion_id']
        artist_id = data['artist_id']
        diary_date = datetime.strptime(data['diary_date'], '%Y-%m-%d')
        content = data['content']

        artist = Artist.objects.get(artist_id=artist_id)
        emotion = Emotion.objects.get(emotion_id=emotion_id)

        # description = generate_description(content, artist.artist_name, emotion.emotion_name)
        image_url = generate_image(content, artist.artist_name, emotion.emotion_name, artist.artist_prompt, artist.example_picture)

        print(f"Generated image URL: {image_url}")

        lock_name = f"lock:re-diary:{user_id}:{diary_date}"
        with distributed_lock(lock_name):
            s3_url = S3ImgUploader.upload_from_url(image_url)

            if not s3_url:
                raise Exception("Failed to upload image to S3")
            
            user = User.objects.get(user_id=user_id)

            diary = Diary.objects.get(user=user, diary_date=diary_date)

            old_image_url = diary.image.image_url
            diary_image = diary.image

            S3ImgUploader.delete_image(old_image_url)

            diary_image.image_url = s3_url
            diary_image.created_at = timezone.now()
            diary_image.save()

            diary.content = content
            diary.emotion = emotion
            diary.artist = artist
            diary.save()

        send_response(user_id, diary.diary_id)

    except Diary.DoesNotExist:
        return f"Diary for user {user_id} on {diary_date} does not exist."
    except User.DoesNotExist:
        return f"User with id {user_id} does not exist."
    except Artist.DoesNotExist:
        return f"Artist with id {artist_id} does not exist."
    except Emotion.DoesNotExist:
        return f"Emotion with id {emotion_id} does not exist."
    except KeyError as e:
        return f"Missing key in message: {e}"
    except json.JSONDecodeError as e:
        return f"Error decoding JSON: {e}"
    except Exception as e:
        return f"Error processing message: {e}"
