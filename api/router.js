const express = require('express');
const multer = require('multer');
const vcf = require('bionode-vcf');
const path = require('path');
const fs = require('fs');
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
  // console.log(req);
  console.log('Received file');
  // console.log(String(req.file.buffer));

  // const fileStrem .createReadStream();
  const fileStream = fs.createReadStream(path.join(__dirname, '../test data/a549.sample_id copy.vcf'));
  // console.log(fileStream);
  // vcf.readStream(bufferToStream(req.file.buffer))
  vcf.readStream(fileStream)
    .on('data', (feature) => {
      // console.log(feature);
    }).on('error', (err) => {
      console.error('it\'s not a vcf', err);
    })
    .once('end', console.log('finished'));

  console.log('here');

  // fs.readFile(path.join(__dirname, '../test data/a549.sample_id copy.vcf'), (err, data) => {
  //   if (err) throw err;
  //   console.log(req.file.buffer);

  //   vcf.readStream(data);
  //   // vcf.read(path.join(__dirname, '../test data/a549.sample_id copy.vcf'));
  //   vcf.on('data', (feature) => {
  //     console.log(feature);
  //   });

  //   vcf.on('end', () => {
  //     console.log('end of file');
  //   });

  //   vcf.on('error', (err) => {
  //     // console.error('it\'s not a vcf', err);
  //   });
  // });

  // vcf.readStream(String(req.file.buffer), 'vcf');
  // // vcf.read(path.join(__dirname, '../test data/a549.sample_id copy.vcf'));
  // vcf.on('data', (feature) => {
  //   // console.log(feature);
  // });

  // vcf.on('end', () => {
  //   console.log('end of file');
  // });

  // vcf.on('error', (err) => {
  //   // console.error('it\'s not a vcf', err);
  // });

  // vcard.parseVcardFile(path.join(__dirname, '../test data/a549.sample_id copy.vcf'), (err, data) => {
  //   if (err) console.log(`oops:${err}`);
  //   else {
  //     console.log(`should be good to go:\n${JSON.stringify(data)}`);
  //   }
  // });

  res.json({ message: 'Upload' });
});

router.get('/', (req, res) => {
  console.log('received request');
  res.json({ message: 'Success' });
});


module.exports = router;
