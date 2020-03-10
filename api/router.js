const express = require('express');

const router = express.Router();

router.post('/upload', (req, res) => {
  // console.log(req);
  console.log('Received file');
  res.json({ message: 'Upload' });
});

router.get('/', (req, res) => {
  console.log('received request');
  res.json({ message: 'Success' });
});


module.exports = router;
