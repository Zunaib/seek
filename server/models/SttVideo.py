from mongoengine import *
import datetime


class SttVideo(Document):
    email: StringField(required=True, max_length=200)
    videoName: StringField(required=True, max_length=200)
    sttName: StringField(required=True, max_length=200)
    sttPath: StringField(required=True, max_length=200)
    sttblocked: BooleanField(required=True)
    sttdeleted: BooleanField(required=True)
