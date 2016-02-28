var mongoose = require('mongoose');
var QuestionModel = require('../schemas/question');
var truthJson = require('../datajson/truth');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/truth_dare');

var i;
for (i = 0; i < truthJson.length; i++) {
    // console.log(truthJson[i].question);    
    var question = new QuestionModel({
        question: truthJson[i].question,
        type: 'truth'
    });
    question.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("new question saved successfully");
        }
    });
}

//mongoose.connection.close();