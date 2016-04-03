var mongoose = require('mongoose');
var QuestionModel = require('../schemas/question');
var truthJson = require('../datajson/truth');
var dareJson = require('../datajson/dare');

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

var j;
for (j = 0; j < dareJson.length; j++) {
    var question = new QuestionModel({
        question: dareJson[j].question,
        type: 'dare'
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