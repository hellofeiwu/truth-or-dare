'use strict';

var dareTmpl = require('./dare.html');

var DareView = function () {

};

DareView.prototype.render = function () {
    return dareTmpl;
};

var dareView = new DareView();

module.exports = dareView;