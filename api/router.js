const express = require('express');
const multer = require('multer');
const vcf = require('bionode-vcf');
const { Readable } = require('stream');


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
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('Received file');
  const requestObj = [];
  vcf.readStream(bufferToStream(req.file.buffer))
    .on('data', (feature) => {
      requestObj.push(feature);
    }).on('error', (err) => {
      console.error('it\'s not a vcf', err);
    })
    .once('end', () => {
      res.json({ message: 'Upload' });
      console.log(requestObj[0]);
      console.log('finished');
    });
});

router.get('/', (req, res) => {
  console.log('received request');
  res.json({ message: 'Success' });
});


module.exports = router;
