const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
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

router.post('/login', (req, res) => {
    const userData = req.body;
    User.findOne({ username: userData.username }, (err, user) => {
        if (err) {
            res.status(422).send({ error: [{ title: 'User Error', detail: 'Could not find the User' }] });
        }
        if (!user) {
            res.status(401).send({ error: [{ title: 'User Error', detail: 'Invalid Username' }] });
        } else {
            if (user.password !== userData.password) {
                res.status(401).send({ error: [{ title: 'User Error', detail: 'Invalid Password' }] })
            } else {
                const payload = { subject: user._id };
                const token = jwt.sign(payload, config.secret);
                res.status(200).send({ token });
            }
        }
    });
});

module.exports = router;