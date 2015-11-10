'use strict';

var truthTmpl = require('./truth.html');

var TruthView = function () {

};

TruthView.prototype.render = function () {
    return truthTmpl;
};

var truthView = new TruthView();

module.exports = truthView;