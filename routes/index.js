var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        user: req.user,
        title: 'Express',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.get('/register', function (req, res) {
    res.render('register', {
        user: req.user,
        title: 'Express',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.post('/register', function (req, res) {
    Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
        if (err) {
            return res.render('register', {
                user: req.user,
                title: 'Express',
                account: account
            });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});
router.get('/login', function (req, res) {
    res.render('index', {
        user: req.user,
        title: 'Express',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/'
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;
