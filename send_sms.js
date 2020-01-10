require('dotenv').config();
const axios = require('axios');
const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function sendTwilioSms(receivingNumber, messaage) {
  client.messages
  .create({
     body: messaage,
     from: process.env.TWILIO_FROM_NUMBER,
     to: receivingNumber
   })
  .then(message => console.log(message.sid));
}

app.get("/send-sheet-sms", function(req, res) {
  var returnStatus = []
  axios.get(process.env.SHEETS_URL)
  .then(function (res) {
    var messages = res.data.feed.entry
    for (let i = 0; i < messages.length; i++) {
      receivingNumber = messages[i].title.$t;
      message = messages[i].content.$t.replace("message: ", "");
      console.log(`${receivingNumber} will receive: ${message}`);
      returnStatus.push(`<li>${receivingNumber} sent: ${message}</li><hr>`);
      sendTwilioSms(receivingNumber, message);
    }
  })
  .catch(function (err) {
    console.log(err);
  })
  .finally(function() {
    res.send(returnStatus.join(""));
  });
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
