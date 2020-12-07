from twilio.rest import Client

account_sid = 'ACd76e6a62b902a83e28fe675968dfe442'
auth_token = 'bbe206c630f73c9dfa08437479df33ff'
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='+14139980018',
    body='The Seek - Zunaib Here :-p',
    to='+923015037166'
)

print(message.sid)
