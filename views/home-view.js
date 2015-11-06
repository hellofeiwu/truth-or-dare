'use strict';

var BaseView = require('./base-view');
var homeTmpl = require('./home.html');

var HomeView = new BaseView();

HomeView.prototype.render = function () {
    return homeTmpl;
};

module.exports = HomeView;