var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    question: { 
        type: String
    },
    type: {
        type: String
    }
});

var QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;