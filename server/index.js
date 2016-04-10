var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/truth_dare');
var QuestionModel = require('./schemas/question');

app.use(bodyParser.json()); // for parsing application/json

app.get('/api/truth', function (req, res) {
    
    var data = {};
    
    QuestionModel.find({type: 'truth'}, function (err, questions) {
        if (err) {
            console.log(err);
        } else {
            var i = Math.floor((Math.random() * questions.length));
            data = {"question": questions[i].question};
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

app.post('/api/truth', function (req, res) {
    console.log(req.body);
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
});

app.use(express.static('../client'));

app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function () {
    console.log("I'm listening on port " + process.env.PORT);
});