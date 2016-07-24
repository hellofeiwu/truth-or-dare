var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var _ = require('lodash');

mongoose.connect('mongodb://localhost/truth_dare');
var QuestionModel = require('./schemas/question');
var UserModel = require('./schemas/user');
var SessionModel = require('./schemas/session');

app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());

var idArray = [];

var createSession = function(res, callback) {
    var session = new SessionModel({
            id: Date.now(),
            expiry: Date.now() + 86400000
        });
        
        session.save(function (err) {
            console.log('session saved')
            if (!err) {
                res.cookie('sessionId', session.id);
                callback();
            }
        });
};

app.use(function (req, res, next) {
    console.log('in our middleware')
    if (req.cookies.sessionId) {
        console.log('user has session: ' + req.cookies.sessionId)
        SessionModel.findOne({id: req.cookies.sessionId}, function(err, session) {
            if (err) {
                console.log(err);
                next();
            }else if (session == undefined || session.expiry < Date.now()){
                createSession(res, next);
            }else {
                console.log('user session updated');
                session.expiry = Date.now() + 86400000;
                session.save(function (err) {
                    if (!err) {
                        next();
                    }
                });
            }
        });
    } else {
        console.log('user does not have session');
        createSession(res, next);
    }
})

// get new truth question
app.get('/api/truth/:restore', function (req, res) {

    if (req.params.restore == 1) {
        console.log(req.params.restore);
        idArray = [];
    }

    var data = {};

    QuestionModel.find({type: 'truth'}, function (err, questions) {
        if (err) {
            console.log(err);
        }else {
            if (idArray.length == questions.length) {
                data = {"question": "There is no new question."};
            }else {
                var unusedIndexes = [];

                for (var i = 0; i < questions.length; ++i) {
                    if (!_.includes(idArray, i)) {
                        unusedIndexes.push(i);
                    }
                }

                var i = Math.floor((Math.random() * unusedIndexes.length));
                var questionsIndex = unusedIndexes[i];
                idArray.push(questionsIndex);
                data = {"question": questions[questionsIndex].question};
            }
        }
        res.json(data);
    });
});

// get new dare question
app.get('/api/dare', function (req, res) {
    
    var data = [];
    
    QuestionModel.find({type: 'dare'}, function (err, questions) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i < questions.length; i++) {
                data.push({"question": questions[i].question});
        }
    }
    res.json(data);
});
});


// add truth question api
app.post('/api/truth', function (req, res) {
    console.log(req.body);
    UserModel.findOne({username: req.get('authorization')}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'error readding from database'
            });
        } else if (!user) {
            console.log("user not exist");
            res.status(401).json({
                message: 'user not exist'
            });
        }else{
            console.log("user authorized");
            
            var question = new QuestionModel({
                question: req.body.question,
                type: req.body.type
            });
            question.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'question save failed'
                    });
                } else {
                    console.log("new truth question saved successfully");
                    res.json({
                        message: 'question saved successfully'
                    });
                }
            });
        }
    });
});

// add new user
app.post('/api/registration', function(req, res) {
    console.log(req.body);
    
    var user = new UserModel({
        username: req.body.username,
        password: req.body.password
    });
    
    user.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'user save failed'
            });
        }else {
            console.log("new user saved successfully");
            res.json({
                message: 'user saved successfully'
            });
        }
    });
});

app.post('/api/login', function (req, res) {
    console.log(req.body);
    
    UserModel.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'error readding from database'
            });
        } else if (!user) {
            console.log("user not exist");
            res.status(401).json({
                message: 'user not exist'
            });
        }else if (req.body.password !== user.password) {
            console.log("wrong password");
            res.status(401).json({
                message: 'wrong password'
            });
        } else{
            console.log("user authorized");
            res.json({
                message: 'logged in successfully'
            });
        }
    });
});

app.use(express.static('../client'));
app.use('/node_modules', express.static('../node_modules'))

app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function () {
    console.log("I'm listening on port " + process.env.PORT);
});