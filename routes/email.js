const express = require('express');
const router = express.Router();

require('dotenv').config();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI,
);

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
async function sendMail(email, massage, name) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'brunoblaise94@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'college du christ roi <brunoblaise94@gmail.com>',
      to: name,
      subject: `Email from an outsider from ${email}`,
      text: 'Hello cxr',
      html: `
      <h1>${email}<h1/>
      <p>${massage}<p/>
     `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));

router.post('/emailtome', async (req, res) => {
  try {
    const {email, massage} = req.body;
const name = 'brunoblaise94@gmail.com'
    sendMail(email, massage, name);
    return res.json('Email sent...');
  } catch (error) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;
