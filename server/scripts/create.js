var mongoose = require('mongoose');
var QuestionModel = require('../schemas/question');
var UserModel = require('../schemas/user');
var truthJson = require('../datajson/truth');
var dareJson = require('../datajson/dare');
var userJson = require('../datajson/user');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/truth_dare');

var i;
for (i = 0; i < truthJson.length; i++) {
    console.log(truthJson[i].question);    
    var question = new QuestionModel({
        question: truthJson[i].question,
        type: 'truth'
    });
    question.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("new truth question saved successfully");
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
            console.log("new dare question saved successfully");
        }
    });
}

var k;
for (k = 0; k < userJson.length; k++) {
    var user = new UserModel({
        username: userJson[k].username,
        password: userJson[k].password,
    });
    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("new user saved successfully");
        }
    });
}

//mongoose.connection.close();