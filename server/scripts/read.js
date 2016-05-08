var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/truth_dare');
var QuestionModel = require('../schemas/question');
var UserModel = require('../schemas/user');

QuestionModel.find({}, function (err, questions) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i < questions.length; i++) {
            console.log('question: ' + i + ' ' + questions[i].question);
            console.log('type: ' + questions[i].type);
        }
    }
});

UserModel.find({}, function (err, user) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i < user.length; i++) {
            console.log(i + ': username: ' + ' ' + user[i].username);
            console.log('password: ' + user[i].password);
        }
    }
});

//mongoose.connection.close();