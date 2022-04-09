const router = require('express').Router();
const authorize = require('../middleware/authorize');
const pool = require('../db');
const path = require('path');
const uploaders = require('../utils/multer');

const cloudinary = require('../utils/cloudinary');
const multer = require('multer');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000000000000000000},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({message: 'Error: Pdf Only!'}, false);
  }
}

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
async function sendMail(emails, link) {
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
      to: emails,
      subject: 'Hello from college du christ roi notification',
      text: 'Hello from cxr',
      html: `Hello from cxr  <br> Great new notification <p>${link}</p> continue to this link <p>https://cxrgo.ml</p>`,
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

router.post('/work', upload.single('recfile'), async (req, res) => {
  const {classe, title, written, summary, email} = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      width: 400,
      height: 500,
      crop: 'scale',
    });

    const recfile = result.url;

    let newNotes = await pool.query(
      'INSERT INTO work (class_year_content, work_title,written, work_note, work_url, teacher_email) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *',
      [classe, title, written, summary, recfile, email],
    );
    const emails = (
      await pool.query('SELECT student_email FROM student')
    ).rows.map((fi) => fi.student_email);

    const link = 'Hey there is a new work go and check it out';

    sendMail(emails, link);

    return res.json(newNotes.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/notes', upload.single('recfile'), async (req, res) => {
  try {
    const {classe, email, title, written, summary} = req.body;
    const result = await cloudinary.uploader.upload(
      req.file.path === undefined ? '' : req.file.path,
      {
        width: 400,
        height: 500,
        crop: 'scale',
      },
    );

    const recfile = result.url;

    let newNotes = await pool.query(
      'INSERT INTO notes (class_year_content,teacher_email, notes_title,written, short_note, notes_url ) VALUES ($1, $2, $3,$4,$5, $6) RETURNING *',
      [classe, email, title, written, summary, recfile],
    );
    const emails = (
      await pool.query('SELECT student_email FROM student')
    ).rows.map((fi) => fi.student_email);
    const link = 'Hey there is a new note go and check it out';
    sendMail(emails, link);
    return res.json(newNotes.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/report',

  upload.single('recfile'),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        width: 400,
        height: 500,
        crop: 'scale',
      });

      const recfile = result.url;

      let newNotes = await pool.query(
        'INSERT INTO report (student_email, report_url) VALUES ($1,$2) RETURNING *',
        [req.body.name, recfile],
      );
      const emails = (
        await pool.query('SELECT student_email FROM student')
      ).rows.map((fi) => fi.student_email);
      const link = 'Hey your report card is out go and check it out';

      sendMail(emails, link);
      return res.json(newNotes.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

router.post('/challenge', async (req, res) => {
  try {
    const {name, question, answers} = req.body;
    const newTodo = await pool.query(
      'INSERT INTO challenge (challenge_name, challenge_question, challenge_choice, challenge_answer) VALUES ($1, $2, $3,$4) RETURNING *',
      [name, question, req.body.choices, answers],
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/syllabus',

  upload.single('recfile'),
  async (req, res) => {
    try {
      const {classe, title} = req.body;
      const result = await cloudinary.uploader.upload(
        req.file.path === undefined ? '' : req.file.path,
        {
          width: 400,
          height: 500,
          crop: 'scale',
        },
      );

      const recfile = result.url;

      let newNotes = await pool.query(
        'INSERT INTO syllabus (titled_syl, url_syllabus, class_year_content) VALUES ($1, $2, $3) RETURNING *',
        [title, recfile, classe],
      );
      const emails = (
        await pool.query('SELECT student_email FROM student')
      ).rows.map((fi) => fi.student_email);
      const link = `Hey there is a new syllabus go and check it out 👉🏿👉🏿 ${newNotes.rows[0].url_syllabus}`;
      sendMail(emails, link);
      return res.json(newNotes.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

router.post('/course', async (req, res) => {
  try {
    const {name, level, category, duration, type} = req.body;
    const newCourse = await pool.query(
      'INSERT INTO course (course_name, course_level, course_category, course_duration, course_type) VALUES ($1, $2, $3, $4,$5) RETURNING * ',
      [name, level, category, duration, type],
    );
    return res.json(newCourse.rows[0]);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/quiz', async (req, res) => {
  try {
    const {question, choices, answer, teacher, name} = req.body;
    const newQuiz = await pool.query(
      'INSERT INTO quiz (quiz_question, quiz_choice, quiz_answer, course_name, teacher_id) VALUES ($1, $2, $3, $4,$5) RETURNING * ',
      [question, choices, answer, name, teacher],
    );
    return res.json(newQuiz.rows[0]);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/open', async (req, res) => {
  try {
    const {question, content, teacher, name} = req.body;
    const newQuiz = await pool.query(
      'INSERT INTO open (quiz_question, content, course_name, teacher_id) VALUES ($1, $2, $3, $4) RETURNING * ',
      [question, content, name, teacher],
    );
    return res.json(newQuiz.rows[0]);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/answers', async (req, res) => {
  try {
    const {question, content, teacher, name} = req.body;
    const newQuiz = await pool.query(
      'INSERT INTO answers (course_name, content, teacher_id, student_email) VALUES ($1, $2, $3, $4) RETURNING * ',
      [question, content, teacher, name],
    );
    return res.json(newQuiz.rows[0]);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/marks', async (req, res) => {
  try {
    const {marks, name, feedback, student, teacher} = req.body;
    const newQuiz = await pool.query(
      'INSERT INTO marks (marks, course_name, feedback, student_id teacher_id) VALUES ($1, $2, $3, $4,$5) RETURNING * ',
      [marks, name, feedback, student, teacher],
    );
    return res.json(newQuiz.rows[0]);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;