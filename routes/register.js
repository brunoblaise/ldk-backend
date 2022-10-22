const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const authorize = require('../middleware/authorize');
const cloudinary = require('../utils/cloudinary');
const uploaders = require('../utils/multer');

router.post('/updateClass/:id', async (req, res) => {
  try {
    const {classe} = req.body;
    const {id} = req.params;

    let newUser = await pool.query(
      'UPDATE student SET class_student = $1 WHERE student_id = $2',
      [classe, id],
    );

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/updateProfile/:id', async (req, res) => {
  try {
    const {fname, lname, parent, gender, age, phone, bio} = req.body;
    const {id} = req.params;

    let newUser = await pool.query(
      'UPDATE student SET  student_fname=$1, student_lname =$2, parent=$3,student_gender =$4,  student_age =$5, student_phonem=$6, student_bio=$7 WHERE student_id = $8',
      [fname, lname, parent, gender, age, phone, bio, id],
    );

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/registerS', uploaders, async (req, res) => {
  try {
    const {
      classe,
      fname,
      type,
      hide,
      lname,
      parent,
      gender,
      email,
      password,
      age,
      phone,
      bio,
    } = req.body;

    const ti = req.file.path;

    const result = await cloudinary.uploader.upload(ti, {
      width: 70,
      height: 53,
      crop: 'scale',
    });

    const photo = result.url;

    const user = await pool.query(
      'SELECT * FROM student WHERE student_email = $1',
      [email],
    );

    if (user.rows.length > 0) {
      return res.status(401).json('User already exist!');
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      'INSERT INTO student (class_student,  student_type, hide, student_fname, student_lname, parent,student_gender,student_email, student_password, student_photo,student_age, student_phonem, student_bio) VALUES ($1, $2, $3,$4 ,$5,$6,$7,$8,$9,$10, $11, $12,$13) RETURNING *',
      [
        classe,
        type,
        hide,
        fname,
        lname,
        parent,
        gender,
        email,
        bcryptPassword,
        photo,
        age,
        phone,
        bio,
      ],
    );

    const jwtToken = jwtGenerator(newUser.rows[0].student_id);

    return res.json({jwtToken});
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

router.post('/loginS', async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM student WHERE student_email = $1',
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(401).json('Invalid email');
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].student_password,
    );

    if (!validPassword) {
      return res.status(401).json('Invalid password');
    }
    const jwtToken = jwtGenerator(user.rows[0].student_id);
    return res.json({jwtToken});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/updateProfileT/:id', async (req, res) => {
  try {
    const {fname, lname,  gender, age, phone, bio} = req.body;
    const {id} = req.params;

    let newUser = await pool.query(
      'UPDATE teacher SET teacher_fname=$1, teacher_lname =$2, parent=$3,teacher_gender =$4,  teacher_age =$5, teacher_phonem=$6, teacher_bio=$7 WHERE teacher_id = $8',
      [fname, lname, gender, age, phone, bio, id],
    );

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/registerT', uploaders, async (req, res) => {
  try {
    const {fname, lname, type, gender, email, password, age, phone, bio} =
      req.body;

    const ti = req.file.path;

    const result = await cloudinary.uploader.upload(ti, {
      width: 70,
      height: 53,
      crop: 'scale',
    });

    const photo = result.url;

    const user = await pool.query(
      'SELECT * FROM teacher WHERE teacher_email = $1',
      [email],
    );

    if (user.rows.length > 0) {
      return res.status(401).json('User already exist!');
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      'INSERT INTO teacher (teacher_fname, teacher_lname, teacher_type,  teacher_gender,teacher_email, teacher_password, teacher_photo,teacher_age, teacher_phonem, teacher_bio) VALUES ($1, $2, $3,$4 ,$5,$6,$7,$8,$9,$10) RETURNING *',
      [
        fname,
        lname,
        type,

        gender,

        email,
        bcryptPassword,
        photo,
        age,
        phone,
        bio,
      ],
    );

    const jwtToken = jwtGenerator(newUser.rows[0].teacher_id);

    return res.json({jwtToken});
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

router.post('/loginT', async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM teacher WHERE teacher_email = $1',
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(401).json('Invalid email');
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].teacher_password,
    );

    if (!validPassword) {
      return res.status(401).json('Invalid password');
    }
    const jwtToken = jwtGenerator(user.rows[0].teacher_id);
    return res.json({jwtToken});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/registerP', uploaders, async (req, res) => {
  try {
    const {fname, lname, hide, gender, email, password, phone, bio} = req.body;

    const ti = req.file.path;

    const result = await cloudinary.uploader.upload(ti, {
      width: 70,
      height: 53,
      crop: 'scale',
    });

    const photo = result.url;

    const user = await pool.query(
      'SELECT * FROM teacher WHERE parent_email = $1',
      [email],
    );

    if (user.rows.length > 0) {
      return res.status(401).json('User already exist!');
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      'INSERT INTO parent (parent_fname, parent_lname, hide, parent_gender,parent_email, parent_password, parent_photo,parent_phonem, parent_bio) VALUES ($1, $2, $3,$4 ,$5,$6,$7,$8) RETURNING *',
      [fname, lname, hide, gender, email, bcryptPassword, photo, phone, bio],
    );

    const jwtToken = jwtGenerator(newUser.rows[0].parent_id);

    return res.json({jwtToken});
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

router.post('/loginP', async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM parent WHERE parent_email = $1',
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(401).json('Invalid email');
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].parent_password,
    );

    if (!validPassword) {
      return res.status(401).json('Invalid password');
    }
    const jwtToken = jwtGenerator(user.rows[0].parent_id);
    return res.json({jwtToken});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;

