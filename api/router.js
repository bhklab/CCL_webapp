/* eslint-disable no-new */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const multer = require('multer');
// const vcf = require('bionode-vcf');
// const { Readable } = require('stream');
const R = require('r-script');
const path = require('path');
const fs = require('fs');
// const uploadToOpenCPU = require('../helpers/uploadToOpenCPU');
const { ErrorHandler } = require('../helpers/error');

const responseData = require('./example-data/results.json');

const router = express.Router();

// // converts mutler file from buffer into readableStream
// // it's required for bionode library
// function bufferToStream(binary) {
//   const readableInstanceStream = new Readable({
//     read() {
//       this.push(binary);
//       this.push(null);
//     },
//   });

//   return readableInstanceStream;
// }

router.get('/', (req, res) => {
	res.status(200).json(responseData);
});

// Loads file into bufffer rather than saving it on VM
// const upload = multer({
//   storage: multer.memoryStorage(),
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.vcf$/)) {
//       return cb(new ErrorHandler(400, 'Only vcf files are allowed!'));
//     }
//     cb(null, true);
//   },
// });

// assigns directory and creates it in the file system if it doesn't exist
const saveDirectory = '/tmp/cclid-uploads';
if (!fs.existsSync(saveDirectory)) {
	fs.mkdirSync(saveDirectory);
}

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, saveDirectory);
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}.vcf`);
	},
});

const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.vcf$/)) {
			return cb(new ErrorHandler(400, 'Only vcf files are allowed!'));
		}
		cb(null, true);
	},
});

router.post('/upload', upload.single('file'), (req, res) => {
	try {
		console.log('Received and saved file');
		const filePath = req.file.path;
		console.log(filePath);
		res.status(200).json(responseData);
		const script = path.join(__dirname, 'R', 'interface.R');
		R(script)
			.data('some file path')
			.call((err, d) => {
				if (err) {
					const buf = err.toString('utf8');
					console.log('error', buf);
				}
				console.log('data', d);
			});
		// vcf.readStream(bufferToStream(req.file.buffer), 'vcf')
		//   .on('data', (feature) => {
		//     requestObj.push(feature);
		//   }).on('error', (err) => {
		//     console.log(err);
		//     new ErrorHandler(400, 'Error reading vcf file');
		//   })
		//   .once('end', () => {
		//     // making post request to opencpu server
		//     // uploadToOpenCPU('http://52.138.39.182/ocpu/library/CCLid/R/test/', requestObj);
		//     uploadToOpenCPU('http://52.138.39.182/ocpu/library/CCLWebInterface/R/web_interface/json', requestObj);
		//     res.status(200).json(requestObj);
		//   })
		//   .catch((err) => {
		//     console.log(err);
		//   });
	} catch (err) {
		console.log('here', err);
	}
});


router.get('/upload', (req, res) => {
	console.log('received request');
	const script = path.join(__dirname, 'R', 'interface.R');
	if (process.env.ENV === 'production') {
		// calling R script to run CCLid analysis
		R(script)
			.call((err, d) => {
				if (err) {
					// analysis creates regular progress messages which are registered as errors by r-script
					const buf = err.toString('utf8');
					console.log('message', buf);
				}
				if (d && d.results) {
					console.log('data', d);
					res.status(200).json(d);
				} else if (d) {
					res.status(400).json({ message: 'Error processing the request' });
				}
			});
	} else {
		res.status(200).json(responseData);
	}
});


module.exports = router;
