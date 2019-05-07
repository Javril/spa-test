const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Temperature = require('../models/weather');
const config = require('../config');

verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: [{ title: 'User Error', detail: 'Unauthorize request' }] });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).send({ error: [{ title: 'User Error', detail: 'Unauthorize request' }] });
    }
    const payload = jwt.verify(token, config.secret);
    if (!payload) {
        return res.status(401).send({ error: [{ title: 'User Error', detail: 'Unauthorize request' }] });
    }
    req.userId = payload.subject;
    next();
}

router.post('/add', (req, res) => {
    const temperatureData = req.body.temperature;
    const newTemperature = new Temperature({
        temperature: temperatureData,
        createdAt: Date.now()
    });
    newTemperature.save((err) => {
        if (err) {
            res.status(422).send({ error: [{ title: 'Temperature Error', detail: 'Could not be saved' }] });
        } else {
            res.status(200).send(newTemperature);
        }
    });
})

router.get('', (req, res) => {
    Temperature.find({}, (err, foundTemperature) => {
        if (err) {
            res.status(422).send({ error: [{ title: 'Temperature Error', detail: 'Could not find the Temperatures' }] });
        }
        res.status(200).send(foundTemperature);
    })
});

module.exports = router;