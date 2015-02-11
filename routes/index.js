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
    res.render('login', {
        user: req.user,
        title: 'Express',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
/*router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function (req, res) {
        res.redirect('/');
    });*/
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/users');
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});


module.exports = router;
