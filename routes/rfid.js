const router = require('express').Router();

const pool = require('../db');

router.post('/id', async (req, res) => {
  try {
    const {id} = req.body;
    const newQuiz = await pool.query(
      'INSERT INTO logs (rfid) VALUES ($1) RETURNING * ',
      [id],
    );
    return res.json(newQuiz.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
