var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res) {
    res.render('users', {
        user: req.user,
        title: 'Express',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
module.exports = router;
