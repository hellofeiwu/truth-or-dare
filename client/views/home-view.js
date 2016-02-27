'use strict';

var homeTmpl = require('./home.html');

var HomeView = function () {
    this.$container = $('<div />');
};

HomeView.prototype.render = function () {
    this.$container.html(homeTmpl);
};

var homeView = new HomeView();

module.exports = homeView;