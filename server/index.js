var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');

mongoose.connect('mongodb://localhost/truth_dare');
var QuestionModel = require('./schemas/question');
var UserModel = require('./schemas/user');

app.use(bodyParser.json()); // for parsing application/json

var idArray = [];

app.get('/api/truth', function (req, res) {
    
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

app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function () {
    console.log("I'm listening on port " + process.env.PORT);
});