from io import BytesIO
import uuid
import requests

import boto3
from botocore.exceptions import NoCredentialsError

from django.conf import settings


AWS_ACCESS_KEY_ID = settings.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = settings.AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET_NAME = settings.AWS_S3_BUCKET_NAME
AWS_S3_ENDPOINT_URL = settings.AWS_S3_ENDPOINT_URL

class S3ImgUploader:
    def __init__(self, file):
        self.file = file

    def upload(self):
        try:
            s3_client = boto3.client(
                "s3",
                aws_access_key_id = AWS_ACCESS_KEY_ID,
                aws_secret_access_key = AWS_SECRET_ACCESS_KEY
            )
            url = "img" + "/" + uuid.uuid1().hex

            s3_client.upload_fileobj(
                self.file, AWS_S3_BUCKET_NAME, url, ExtraArgs={"ContentType": self.file.content_type}
            )
            return f"{AWS_S3_ENDPOINT_URL}{url}"
        
        except NoCredentialsError:
            print("Credentials not available")
            return None
        except Exception as e:
            print(f"Failed to upload image to S3: {e}")
            return None

    @staticmethod
    def upload_from_url(image_url):
        try:
            response = requests.get(image_url)
            if response.status_code == 200:
                file_obj = BytesIO(response.content)
                file_obj.content_type = response.headers['Content-Type']
                
                uploader = S3ImgUploader(file_obj)
                s3_url = uploader.upload()
                return s3_url
            else:
                print(f"Failed to download image. Status code: {response.status_code}")
                return None
        except Exception as e:
            print(f"Failed to upload image to S3: {e}")
            return None
