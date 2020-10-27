from mongoengine import *
import datetime


class ContactUs(Document):
    email: StringField(required=True, max_length=200)
    message: StringField(required=True, max_length=200)
