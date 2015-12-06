'use strict';

var truthTmpl = require('./truth.html');
var truth = require('../data/truth.json');

var TruthView = function () {

};

TruthView.prototype.render = function () {
    var html = '';
    for (var i = 0; i < truth.length; ++i) {
        var title = '<h1>' + truth[i].title + '</h1>';
        var content = '<p>' + truth[i].content + '</p>';

        html += title + content;
    }
    return html;
};

var truthView = new TruthView();

module.exports = truthView;