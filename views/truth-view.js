'use strict';

var truthTmpl = require('./truth.handlebars');
var truth = require('../data/truth.json');

var TruthView = function () {

};

TruthView.prototype.render = function () {
    var i = Math.floor((Math.random() * truth.length));
    var $truthTmpl = $(truthTmpl);
    $truthTmpl.find('#change').click(function() {
        truth.splice(i,1);
        i = Math.floor((Math.random() * truth.length));
    });

    return truthTmpl({
        question: truth[i].question
    });
};

var truthView = new TruthView();

module.exports = truthView;