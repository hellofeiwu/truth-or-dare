'use strict';

var $ = require('jquery');
var registrationTmpl = require('./registration.handlebars');

var RegistrationView = function () {
    this.$container = $('<div />');
};

RegistrationView.prototype.render = function () {
    var self = this;
    var $registrationTmpl = $(registrationTmpl());
    self.$container.empty().append($registrationTmpl);
    
    $registrationTmpl.find("#registration").click(function() {
            console.log('button works ' + $registrationTmpl.find("#username").val());
            var url = 'api/registration';
            var registrationInfo = {
                username: $registrationTmpl.find("#username").val(),
                password: $registrationTmpl.find("#password").val()
            };
            $.ajax({
                type: "POST",
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(registrationInfo),
                success: function(data){
                    window.localStorage.setItem('username', $registrationTmpl.find("#username").val());
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

var registrationView = new RegistrationView();

module.exports = registrationView;
