const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Bodyparser Middleware
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// start the server using port 5000.
app.listen(port, () => {
    console.log('Server Started at ', port);
})