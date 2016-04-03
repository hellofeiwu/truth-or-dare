var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/truth_dare');
var QuestionModel = require('./schemas/question');

app.get('/api/truth', function (req, res) {
    
    var data = [];
    
    QuestionModel.find({type: 'truth'}, function (err, questions) {
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

app.use(express.static('../client'));

app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function () {
    console.log("I'm listening on port " + process.env.PORT);
});