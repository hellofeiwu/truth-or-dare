'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var CONF = require('./config');
var userModel = require('./model/user');
var userController = require('./controller/userController');
var questionController = require('./controller/questionController');

// config passport strategy start
var JwtStrategy = require('passport-jwt').Strategy;
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = CONF.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    userModel.findOne({_id: jwt_payload._doc._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

passport.use(new LocalAPIKeyStrategy(
    function(apikey, done) {
        userModel.findOne({ apikey: apikey }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }
));
// config passport strategy end

var requireAuth = passport.authenticate(['jwt', 'localapikey'], { session: false });

mongoose.connect('mongodb://fei:111111@ds031647.mlab.com:31647/truth_dare');

// enable CORS request
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(bodyParser.json()); // for parsing application/json

app.post('/register', userController.register);

app.post('/login', userController.login);

app.get('/question', requireAuth, questionController.getQuestions);
app.post('/question', requireAuth, questionController.addQuestion);
app.delete('/question', requireAuth, questionController.deleteQuestion);

app.listen(process.env.PORT, function () {
    console.log('Listening on port' + process.env.PORT);
});