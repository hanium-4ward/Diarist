from django.db import models


class User(models.Model):
    '''
    user (사용자) table
    '''
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    social_code = models.CharField(max_length=255)
    user_role = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'users'

class Image(models.Model):
    '''
    image (일기에 대한 그림) table
    '''
    image_id = models.AutoField(primary_key=True)
    image_url = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'image'

class Artist(models.Model):
    '''
    artist (화가) table
    '''
    artist_id = models.AutoField(primary_key=True)
    artist_name = models.CharField(max_length=255)
    artist_picture = models.CharField(max_length=255)
    artist_prompt = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    period = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'artist'


class Emotion(models.Model):
    '''
    emotion (감정) table
    '''
    emotion_id = models.AutoField(primary_key=True)
    emotion_name = models.CharField(max_length=255)
    emotion_picture = models.CharField(max_length=255, null=True, blank=True)
    emotion_prompt = models.CharField(max_length=255)

    class Meta:
        managed = False 
        db_table = 'emotion'
        

class Diary(models.Model):
    '''
    diary (일기) table
    '''
    diary_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, null=True, on_delete=models.SET_NULL)
    emotion = models.ForeignKey(Emotion, null=True, on_delete=models.SET_NULL)
    image = models.ForeignKey(Image, null=True, blank=True, on_delete=models.SET_NULL)
    diary_date = models.DateField()
    content = models.CharField(max_length=1000)
    deleted_at = models.DateTimeField(null=True, blank=True)
    favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False 
        db_table = 'diary'
