'use strict';

var truthTmpl = require('./truth.html');
var truth = require('../data/truth.json');

var TruthView = function () {

};

TruthView.prototype.render = function () {
    var i = Math.floor((Math.random() * truth.length));
    $(truthTmpl).find('#question').innerHTML = truth[i].question;
    return truthTmpl;
};

var truthView = new TruthView();

module.exports = truthView;