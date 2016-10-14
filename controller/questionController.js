'use strict';

var questionModel = require('../model/question');

var questionController = {
    createQuestion: function(req, res) {
        var question = new questionModel({
            userId: req.user._id,
            question: req.body.question,
            type: req.body.type
        });

        question.save(function(err){
            if (err) throw err;
            console.log('question created');
        });
        res.send('question created');
    },
    getQuestions: function(req, res) {
        questionModel.find({userId: req.user._id, type: req.query.type || 'truth'}).exec(function(err, questions) {
            if (err) throw err;
            res.send(questions);
        });
    },
    deleteQuestion: function(req, res) {
        questionModel.findOneAndRemove({_id: req.body._id}, function(err) {
            if (err) throw err;
            console.log('question deleted!');
        });
        res.send('question deleted!');
    }
};

module.exports = questionController;