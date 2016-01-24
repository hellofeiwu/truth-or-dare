'use strict';

var homeTmpl = require('./home.html');

var HomeView = function () {

};

HomeView.prototype.render = function () {
    return homeTmpl;
};

var homeView = new HomeView();

module.exports = homeView;