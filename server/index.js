const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users');

const FakeDb = require('./models/user-fake-db');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

mongoose.connect(config.database, { useNewUrlParser: true }, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database is connected');
    }
}).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

app.use('/api/v1/users', userRoutes);

app.listen(config.port, err => {
    console.log('The server is running on port ' + config.port);
});