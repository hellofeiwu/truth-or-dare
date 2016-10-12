var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    question: String,
    type: String
});

var questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;