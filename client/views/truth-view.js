'use strict';

var truthTmpl = require('./truth.handlebars');
var truth = require('./truth.json');

var TruthView = function () {

};

TruthView.prototype.render = function () {
    var i = Math.floor((Math.random() * truth.length));
    var $truthTmpl = $(truthTmpl({
        question: truth[i].question
    }));
    $truthTmpl.find('#change').click(function() {
        if (truth.length == 1) {
            alert('This is the last question.');
        }else {
            truth.splice(i,1);
            i = Math.floor((Math.random() * truth.length));
            $truthTmpl.find('#question').html(truth[i].question + '?');
        }
    });

    return $truthTmpl;
};

var truthView = new TruthView();

module.exports = truthView;
