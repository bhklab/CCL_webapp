const express = require('express');
const multer = require('multer');
const vcf = require('bionode-vcf');
const path = require('path');
const { Readable } = require('stream');
const {ErrorHandler} = require('../helpers/error')


// converts mutler file from buffer into readableStream
// it's required for bionode library
function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
}

// Loads file into bufffer rather than saving it on VM
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.vcf$/)) {
      return cb(new ErrorHandler(400, 'Only vcf files are allowed!'));
  }
  cb(null, true);
  }
 });

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    console.log('Received file');
    const requestObj = [];
    let error
    vcf.readStream(bufferToStream(req.file.buffer), 'vcf')
      .on('data', (feature) => {
        requestObj.push(feature);
      }).on('error', (err) => {
        error = err
        res.status(400).json({error: 'Error reading vcf file'})
      })
      .once('end', () => {
        if (!error) {
          res.status(200).json({ message: 'Upload' });
          console.log(requestObj[0]);
          console.log('finished');
        }
      });
  } catch(err) {
    console.log('here');
  }
});

router.get('/', (req, res) => {
  console.log('received request');
  res.json({ message: 'Success' });
});


module.exports = router;
