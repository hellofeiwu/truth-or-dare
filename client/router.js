'use strict';

var homeView = require('./views/home-view');
var truthView = require('./views/truth-view');
var dareView = require('./views/dare-view');
var loginView = require('./views/login-view');

var router = {
    init: function ($container) {
        this.$container = $container;
        window.onhashchange = function () {
            router.renderPage(router.getFragment());
        };
        this.renderPage();
    },
    getFragment: function () {
        return window.location.hash.replace('#', '');
    },
    authenticate: function () {
        return window.localStorage.getItem('username');
    },
    renderPage: function (hash) {
        if (hash === undefined) {
            hash = this.getFragment();
        }
        
        if (this.authenticate() === undefined) {
            hash = 'login';
        }

        var $content;
        switch (hash) {
            case 'truth':
                truthView.render();
                $content = truthView.$container;
                break;
            case 'dare':
                dareView.render();
                $content = dareView.$container;
                break;
            case 'login':
                loginView.render();
                $content = loginView.$container;
                break;
            default:
                homeView.render();
                $content = homeView.$container;
                break;
        }
        this.$container.empty();
        this.$container.append($content);
    }
};

module.exports = router;