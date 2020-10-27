from mongoengine import *
import datetime


class NorVideo(Document):
    email: StringField(required=True, max_length=200)
    videoName: StringField(required=True, max_length=200)
    norName: StringField(required=True, max_length=200)
    norPath: StringField(required=True, max_length=200)
    norblocked: BooleanField(required=True)
    nordeleted: BooleanField(required=True)
