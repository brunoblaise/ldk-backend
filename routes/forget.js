const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

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
async function sendMail(email, link) {
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
      to: email,
      subject: 'Reset password',
      text: 'Hello from cxr now let reset password if you did not request it just ignore it',
      html: `Hello from cxr  <br> Forgot your password? It's okay -- we haven't forgotten you! Click on the following link to reset your password.<p>${link} </p> If clicking doesn't seem to work, you can copy and paste the link into your browser's address bar.

      If you didn't ask to reset your password, you can just ignore this email.`,
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

router.post('/forget', async (req, res) => {
  try {
    const {email} = req.body;

    const user = await pool.query(
      'SELECT * FROM student WHERE student_email = $1',
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(401).json('User does not exist');
    }

    const secret = process.env.jwtSecret + user.rows[0].student_password;
    const payload = {
      user: {
        email: user.rows[0].student_email,
        id: user.rows[0].student_id,
      },
    };
    const token = jwt.sign(payload, secret, {expiresIn: '2h'});
    const link = `https://cxrgo.ml/forget/${user.rows[0].student_id}/${token}`;
    sendMail(email, link);
    return res.json({token});
  } catch (error) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;
