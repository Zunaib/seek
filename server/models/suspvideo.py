from mongoengine import *
import datetime


class SuspVideo(Document):
    email: StringField(required=True, max_length=200)
    videoName: StringField(required=True, max_length=200)
    suspName: StringField(required=True, max_length=200)
    suspPath: StringField(required=True, max_length=200)
    burglary: IntField(required=True)
    fighting: IntField(required=True)
    firing: IntField(required=True)
    explosion: IntField(required=True)
    stabbing: IntField(required=True)
    vandalism: IntField(required=True)
    suspblocked: BooleanField(required=True)
    suspdeleted: BooleanField(required=True)
