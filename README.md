# send-twilio-sms-through-sheet

*Need an easy, accessible way to send SMS via Twilio through Google Sheets, without having to mess with oAuth restrictions?*

**So did I.**

Simple solution is to create a Google Sheet, publish it, and access it via JSON using the public URL. Then, this app creates an endpoint
that will consume that JSON data to send through a Twilio service.

### Important Note ###

This does expose phone numbers and messages to a public URL. If someone captures the published URL, your information is in danger.
To combat this, I suggest you only publish the first sheet and move the data in / out as necessary.
