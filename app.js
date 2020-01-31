const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const router = require('./api/router.js');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));

// this will set/use our api to initial path of /api.
app.use('/api', router);

// renders react files if request doesn't go to api
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});


const port = process.env.PORT || 5000;

// start the server using port 5000.
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})