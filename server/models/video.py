from mongoengine import *
import datetime


class Video(Document):
    email: StringField(required=True, max_length=200)
    videoName: StringField(required=True, max_length=200)
    suspName: StringField(required=True, max_length=200)
    norName: StringField(required=True, max_length=200)
    sttName: StringField(required=True, max_length=200)
    filePath: StringField(required=True, max_length=200)
    blocked: BooleanField(required=True)
    deleted:  BooleanField(required=True)
