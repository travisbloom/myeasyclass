var facebook,
FacebookStrategy = require('passport-facebook'),
passport = require('passport'),
secrets = require('../secrets'),
callback;

passport.use(new FacebookStrategy({
        clientID: secrets.facebook.clientID,
        clientSecret: secrets.facebook.clientSecret,
        callbackURL: secrets.facebook.callbackURL,
        enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
       console.log(accessToken);

    }
));

facebook = {
    callback: passport.authenticate('facebook', { failureRedirect: '/login' }),
    auth:   passport.authenticate('facebook')
};

module.exports = facebook;