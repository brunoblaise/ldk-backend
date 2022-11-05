const express = require('express');
const router = express.Router();
const {createWorker} = require('tesseract.js');
const worker = createWorker();
const pool = require('../db');
const multer = require('multer');
const fs = require('fs');
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
}).single('file');

router.post('/', async (req, res) => {
  try {
    upload(req, res, async (err) => {
      fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
        if (err) return console.log('This is your error', err);
        worker
          .recognize(data, 'eng', {tessjs_create_pdf: '1'})
          .progress((p) => {
            console.log('progress', p);
          })
          .then((result) => {
            console.log(result.text);
            res.redirect('/get');
          })
          .finally(() => worker.terminate());
      });
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/get', async (req, res) => {
  try {
    const file = `${__dirname}/tesseract.js-ocr-result.pdf`;
    res.download(file);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
