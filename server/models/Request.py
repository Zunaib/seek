from mongoengine import *
import datetime


class Request(Document):
    email: StringField(required=True, max_length=200)
    reason: StringField(required=True, max_length=200)
    message: StringField(required=True, max_length=200)
