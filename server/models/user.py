from mongoengine import *
import datetime


class User(Document):
    first_name: StringField(required=True, max_length=200)
    last_name: StringField(required=True, max_length=200)
    email: StringField(required=True, max_length=200)
    password: StringField(required=True, max_length=200)
    blocked: BooleanField(required=True)
    admin: BooleanField(required=True)
    phone_number: StringField(required=True, max_length=11)
    address: StringField(required=True, max_length=400)
    gender: StringField(required=True, max_length=20)
    created: DateTimeField(default=datetime.datetime.now)
