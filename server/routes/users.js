const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(422).send({ error: [{ title: 'User Error', detail: 'Could not find the User' }] });
        }
        if (!user) {
            res.json('userNotFound');
        } else {
            res.json(user);
        }
    })
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(422).send({ error: [{ title: 'User Error', detail: 'Could not find the User' }] });
        }
        if (user) {
            res.json('userExists');
        } else {
            const user = new User({
                username: username,
                password: password
            });
            user.save((err) => {
                if (err) {
                    res.status(422).send({ error: [{ title: 'User Error', detail: 'Could not find the User' }] });
                } else {
                    res.json('userRegistered');
                }
            });
        }
    })
});

router.get('', (req, res) => {
    User.find({}, (err, foundUser) => {
        if (err) {
            res.status(422).send({ error: [{ title: 'User Error', detail: 'Could not find the User' }] });
        }
        res.json(foundUser);
    })
});

router.get('/:slug', (req, res) => {
    const userSlug = req.params.slug;
    User.findOne({ slug: `${userSlug}` }, (err, foundUser) => {
        if (err) {
            res.status(422).send({ error: [ { title: 'User Error', detail: 'Could not find this User '}]})
        }
        res.json(foundUser);
    });
})

module.exports = router;