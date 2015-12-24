'use strict';

var dareTmpl = require('./dare.handlebars');
var dare = require('../data/dare.json');

var TruthView = function () {

};

TruthView.prototype.render = function () {
    var i = Math.floor((Math.random() * dare.length));
    var $dareTmpl = $(dareTmpl({
        question: dare[i].question
    }));
    $dareTmpl.find('#change').click(function() {
        if (dare.length == 1) {
            alert('This is the last question.');
        }else {
            dare.splice(i,1);
            i = Math.floor((Math.random() * dare.length));
            $dareTmpl.find('#question').html(dare[i].question);
        }
    });

    return $dareTmpl;
};

var dareView = new TruthView();

module.exports = dareView;
