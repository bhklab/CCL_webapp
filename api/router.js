const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('received request');
    res.json({message: 'Success'});
})

module.exports = router;