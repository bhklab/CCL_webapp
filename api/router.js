/* eslint-disable no-new */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
// const uploadToOpenCPU = require('../helpers/uploadToOpenCPU');
const { ErrorHandler } = require('../helpers/error');
const responseData = require('../example-data/results.json');
const { runAnalysis } = require('../helpers/runAnalysis.js');

const router = express.Router();

// sends example response data
router.get('/', (req, res) => {
  const output = responseData;
  output.fileName = 'test';
  res.status(200).json(responseData);
});

// assigns directory and creates it in the file system if it doesn't exist
const saveDirectory = '/tmp/cclid-uploads';
if (!fs.existsSync(saveDirectory)) {
  fs.mkdirSync(saveDirectory);
}

// mutler disc storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, saveDirectory);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.vcf`);
  },
});

// multer filters non vcf files out
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.vcf$/)) {
      return cb(new ErrorHandler(400, 'Only vcf files are allowed!'));
    }
    cb(null, true);
  },
});

// removes vcf once the analysis is done
const deleteDataFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.log(`Error deleting file ${filePath}, reason: ${err}`);
    console.log(`File ${filePath} is sucessfully deleted`);
  });
};

// send example file for download
router.get('/exampleVCF', (req, res) => {
  // eslint-disable-next-line prefer-template
  res.download(`${path.join(__dirname, '../')}/test_data/DU-40nM.vcf`, 'exampleVCF.vcf');
});

// route that handles vcf uploads and analysis
router.post('/upload', upload.single('file'), (req, res) => {
  req.setTimeout(500000);
  // gets uploaded file location
  const filePath = req.file.path;
  // gets original file name
  const { originalname } = req.file;
  console.log(`Received and saved file ${originalname}, running R analysis...`);
  if (process.env.ENV === 'production') {
    runAnalysis(filePath)
      .then((data) => {
        const { output } = data;
        output.fileName = originalname;
        console.log('Response is supposed to be sent');
        res.status(data.code).json(output);
        deleteDataFile(filePath);
      })
      .catch((err) => {
        console.log(err);
        const { output } = err;
        if (output) output.fileName = originalname;
        if (output) {
          res.status(err.code).json(output);
        } else {
          res.status(500).json({ error: 'Something went wrong' });
        }
        deleteDataFile(filePath);
      });
  } else {
    res.status(400).json({ message: 'R package is not supposed to work in "development"' });
  }
});


// retrieves list of cell lines from pharmacodb api
router.get('/cells', (req, res) => {
  axios.get('https://api.pharmacodb.ca/v1/cell_lines?all=true')
    .then((response) => {
      // processes cell ids and names to generate unique cell ids
      // in a way that matches urls of cell line pages in PharmacoDB
      const output = {};
      const { data } = response;
      const mapObj = {
        '.': '_',
        '(': '_',
        ')': '_',
        '-': '',
        ';': '_',
      };
      data.forEach((el) => {
        const uniqueId = `${el.name}_${el.id}_2019`
          .replace(/[.]|[(]|[)]|[-]|[;]/g, (matched) => mapObj[matched])
          .replace(' ', '')
          .replace('__', '_');
        output[el.name] = uniqueId;
      });
      res.status(200).json(output);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve cell line data' });
    });
});

module.exports = router;
