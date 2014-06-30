var express = require('express'),
hbs  = require('hbs'),
path = require('path'),
routes= require('./routes');
var app = express();

//sets views
app.configure(function() {
    app.set('views', path.join(__dirname, 'app/views'));
});

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.get('/', function(req, res){
    res.render('index');;
});

app.get('/auth/facebook/call', routes.facebook.auth);
app.get('/auth/facebook/callback', routes.facebook.callback, function(res, req) {
    console.log(res);
    // Successful authentication, redirect home.
    res.redirect('/');
});


app.listen(3000);