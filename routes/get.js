const router = require('express').Router();
const authorize = require('../middleware/authorize');
const pool = require('../db');
const {format} = require('timeago.js');
router.get('/profile', authorize, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT class_student,student_fname,student_id,hide, student_type, student_email, student_age, student_bio, student_phonem, student_gender, student_photo FROM student WHERE student_id = $1',
      [req.user.id],
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/Emailsel', async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT class_student, student_email, student_phonem, student_gender, student_fname, student_lname, student_photo FROM student',
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/teacher', authorize, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT teacher_fname,teacher_type, teacher_id, teacher_email, teacher_age, teacher_bio, teacher_phonem, teacher_gender, teacher_photo FROM teacher WHERE teacher_id = $1',
      [req.user.id],
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/message', async (req, res) => {
  try {
    const user = await pool.query('SELECT  * from messages');

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});
router.get('/notes', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from notes');
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/notes/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query('SELECT * FROM notes WHERE notes_id = $1', [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/work', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from work');
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/work/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query('SELECT * FROM work WHERE work_id = $1', [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/report', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from report');
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/syllabus', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from syllabus');
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/challenge', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from challenge');
    const result = user.rows.filter(
      (fil) =>
        format(fil.timestamp) === '1 day ago' ||
        format(fil.timestamp) === '1 minute ago ' ||
        format(fil.timestamp) === '2 minutes ago' ||
        format(fil.timestamp) === '3 minutes ago' ||
        format(fil.timestamp) === '4 minutes ago' ||
        format(fil.timestamp) === '5 minutes ago' ||
        format(fil.timestamp) === '6 minutes ago' ||
        format(fil.timestamp) === '7 minutes ago' ||
        format(fil.timestamp) === '8 minutes ago' ||
        format(fil.timestamp) === '9 minutes ago' ||
        format(fil.timestamp) === '10 minutes ago' ||
        format(fil.timestamp) === '11 minutes ago' ||
        format(fil.timestamp) === '12 minutes ago' ||
        format(fil.timestamp) === '13 minutes ago' ||
        format(fil.timestamp) === '14 minutes ago' ||
        format(fil.timestamp) === '15 minutes ago' ||
        format(fil.timestamp) === '16 minutes ago' ||
        format(fil.timestamp) === '17 minutes ago' ||
        format(fil.timestamp) === '18 minutes ago' ||
        format(fil.timestamp) === '19 minutes ago' ||
        format(fil.timestamp) === '20 minutes ago' ||
        format(fil.timestamp) === '21 minutes ago' ||
        format(fil.timestamp) === '22 minutes ago' ||
        format(fil.timestamp) === '23 minutes ago' ||
        format(fil.timestamp) === '24 minutes ago' ||
        format(fil.timestamp) === '25 minutes ago' ||
        format(fil.timestamp) === '26 minutes ago' ||
        format(fil.timestamp) === '27 minutes ago' ||
        format(fil.timestamp) === '28 minutes ago' ||
        format(fil.timestamp) === '29 minutes ago' ||
        format(fil.timestamp) === '30 minutes ago' ||
        format(fil.timestamp) === '31 minutes ago' ||
        format(fil.timestamp) === '32 minutes ago' ||
        format(fil.timestamp) === '33 minutes ago' ||
        format(fil.timestamp) === '34 minutes ago' ||
        format(fil.timestamp) === '35 minutes ago' ||
        format(fil.timestamp) === '36 minutes ago' ||
        format(fil.timestamp) === '37 minutes ago' ||
        format(fil.timestamp) === '38 minutes ago' ||
        format(fil.timestamp) === '39 minutes ago' ||
        format(fil.timestamp) === '40 minutes ago' ||
        format(fil.timestamp) === '41 minutes ago' ||
        format(fil.timestamp) === '42 minutes ago' ||
        format(fil.timestamp) === '43 minutes ago' ||
        format(fil.timestamp) === '44 minutes ago' ||
        format(fil.timestamp) === '45 minutes ago' ||
        format(fil.timestamp) === '46 minutes ago' ||
        format(fil.timestamp) === '47 minutes ago' ||
        format(fil.timestamp) === '48 minutes ago' ||
        format(fil.timestamp) === '49 minutes ago' ||
        format(fil.timestamp) === '50 minutes ago' ||
        format(fil.timestamp) === '51 minutes ago' ||
        format(fil.timestamp) === '52 minutes ago' ||
        format(fil.timestamp) === '53 minutes ago' ||
        format(fil.timestamp) === '54 minutes ago' ||
        format(fil.timestamp) === '55 minutes ago' ||
        format(fil.timestamp) === '56 minutes ago' ||
        format(fil.timestamp) === '57 minutes ago' ||
        format(fil.timestamp) === '58 minutes ago' ||
        format(fil.timestamp) === '59 minutes ago' ||
        format(fil.timestamp) === '60 minutes ago' ||
        format(fil.timestamp) === '1 hour ago' ||
        format(fil.timestamp) === '2 hours ago' ||
        format(fil.timestamp) === '3 hours ago' ||
        format(fil.timestamp) === '4 hours ago' ||
        format(fil.timestamp) === '5 hours ago' ||
        format(fil.timestamp) === '6 hours ago' ||
        format(fil.timestamp) === '7 hours ago' ||
        format(fil.timestamp) === '8 hours ago' ||
        format(fil.timestamp) === '9 hours ago' ||
        format(fil.timestamp) === '10 hours ago' ||
        format(fil.timestamp) === '11 hours ago' ||
        format(fil.timestamp) === '12 hours ago' ||
        format(fil.timestamp) === '13 hours ago' ||
        format(fil.timestamp) === '14 hours ago' ||
        format(fil.timestamp) === '15 hours ago' ||
        format(fil.timestamp) === '16 hours ago' ||
        format(fil.timestamp) === '17 hours ago' ||
        format(fil.timestamp) === '18 hours ago' ||
        format(fil.timestamp) === '19 hours ago' ||
        format(fil.timestamp) === '20 hours ago' ||
        format(fil.timestamp) === '21 hours ago',
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/quiz', async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT * from quiz JOIN courses ON quiz.course_name = courses.course_name',
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/open', async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT * from open JOIN courses ON open.course_name = courses.course_name',
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/answers', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from  answers');
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/marks', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from  marks');
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/courses', async (req, res) => {
  try {
    const user = await pool.query('SELECT * from  courses');
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;
