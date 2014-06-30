var facebook,
FacebookStrategy = require('passport-facebook'),
passport = require('passport'), callback;

passport.use(new FacebookStrategy({
        clientID: '294735760708582',
        clientSecret: '3d18717629f7a183f37e7610adf3c903',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
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