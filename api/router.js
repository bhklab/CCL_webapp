/* eslint-disable no-new */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
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

// send example file for download
router.get('/exampleVCF', (req, res) => {
  // eslint-disable-next-line prefer-template
  res.download(`${path.join(__dirname, '../')}/test data/DU-40nM.vcf`, 'exampleVCF.vcf');
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

// route that handles vcf uploads and analysis
router.post('/upload', upload.single('file'), (req, res) => {
  console.log('Received and saved file, running R analysis...');
  // gets uploaded file location
  const filePath = req.file.path;
  // gets original file name
  const { originalname } = req.file;
  if (process.env.ENV === 'production') {
    runAnalysis(filePath)
      .then((data) => {
        const { output } = data;
        output.fileName = originalname;
        res.status(data.code).json(output);
        deleteDataFile(filePath);
      })
      .catch((err) => {
        const { output } = err;
        output.fileName = originalname;
        res.status(err.code).json(output);
        deleteDataFile(filePath);
      });
  } else {
    res.status(400).json({ message: 'R package is not supposed to work in "development"' });
  }
});

// // analysis with default vcf file
// router.get('/upload', (req, res) => {
// 	console.log('received request');
// 	const script = path.join(__dirname, 'R', 'interface.R');
// 	if (process.env.ENV === 'production') {
// 		// calling R script to run CCLid analysis
// 		R(script)
// 			.data('/usr/local/lib/R/site-library/CCLWebInterface/extdata/a549.sample_id.vcf')
// 			.call((err, d) => {
// 				if (err) {
// 					// analysis creates regular progress messages which are registered as errors by r-script
// 					const buf = err.toString('utf8');
// 					console.log('message', buf);
// 				}
// 				if (d && d.results) {
// 					console.log('data', d);
// 					res.status(200).json(d);
// 				} else if (d) {
// 					res.status(400).json({ message: 'Error processing the request' });
// 				}
// 			});
// 	} else {
// 		res.status(200).json(responseData);
// 	}
// });

module.exports = router;
