'use strict';

var $ = require('jquery');
var loginTmpl = require('./login.handlebars');

var LoginView = function () {
    this.$container = $('<div />');
};

LoginView.prototype.render = function () {
    var self = this;
    var $loginTmpl = $(loginTmpl());
    self.$container.empty().append($loginTmpl);
    
    $loginTmpl.find("#login").click(function() {
            console.log('button works ' + $loginTmpl.find("#username").val());
            var url = 'api/login';
            var loginInfo = {
                username: $loginTmpl.find("#username").val(),
                password: $loginTmpl.find("#password").val()
            };
            $.ajax({
                type: "POST",
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(loginInfo),
                success: function(data){
                    window.localStorage.setItem('username', $loginTmpl.find("#username").val());
                    window.location.assign('');
                    console.log('works');
                },
                error: function(data) {
                    console.log('fail');
                },
                dataType: 'json'
            });
        });
};

var loginView = new LoginView();

module.exports = loginView;
