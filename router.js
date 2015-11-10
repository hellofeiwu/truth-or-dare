'use strict';

var homeView = require('./views/home-view');
var truthView = require('./views/truth-view');

var router = {
    init: function ($container) {
        this.$container = $container;
        window.onhashchange = function () {
            this.renderPage(this.getFragment());
        };
        this.renderPage();
    },
    getFragment: function () {
        return window.location.hash.replace('#', '');
    },
    renderPage: function (hash) {
        if (hash === undefined) {
            hash = this.getFragment();
        }

        var content;
        switch (hash) {
            case 'truth':
                content = new truthView.render();
                break;
            default:
                content = new homeView.render();
                break;
        }
        this.$container.html(content);
    }
};

module.exports = router;