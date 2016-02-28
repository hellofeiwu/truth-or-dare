var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/truth_dare');
var QuestionModel = require('../schemas/question');

QuestionModel.find({}, function (err, questions) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i < questions.length; i++) {
            console.log(questions[i].question);
        }
    }
});

//mongoose.connection.close();