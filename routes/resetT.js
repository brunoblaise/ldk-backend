const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

const jwt = require('jsonwebtoken');

router.post('/reset/:id/:token', async (req, res) => {
  try {
    const {id, token} = req.params;
    const {password} = req.body;
    const user = await pool.query(
      'SELECT * FROM teacher WHERE teacher_id = $1',
      [id],
    );

    if (user.rows.length === 0) {
      return res.status(401).json('User does not exist');
    }
    const secret = process.env.jwtSecret + user.rows[0].teacher_password;
    const payload = jwt.verify(token, secret);

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      'UPDATE teacher SET teacher_password = $1 WHERE teacher_id = $2',
      [bcryptPassword, id],
    );

    return res.json({payload});
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
