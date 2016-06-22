'use strict';

var $ = require('jquery');
var truthTmpl = require('./truth.handlebars');
var HttpRequest = require('../common/httpRequest.js');

var TruthView = function () {
    this.$container = $('<div />');
};

TruthView.prototype.render = function () {
    var self = this;
    var truth = '';

    var $truthTmpl = $(truthTmpl());
    self.$container.empty().append($truthTmpl);
    
    // make api call and response
    var getQuestion = function(restore) {
        var url = '/api/truth/' + restore;
        $.getJSON(url, function (data) {
        truth = data;
        cardInsert();
    });
    };

    var cardInsert = function () {
        $truthTmpl.find('.card-bottom').after('<div class="card"><h1 id="question">' +
            truth.question +
            '<div>' +
            '<button class="btn btn-default" id="question-restore">Restore</button>' +
            '<button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Submit your own</button>' +
            '</div>' +
            '</h1></div>');
        if (truth.question == 'There is no new question.') {
            $truthTmpl.find('#question').find('button').show();
        }
        $truthTmpl.find('#question-restore').click(function() {
            $truthTmpl.find('.card').addClass('move-left');
            getQuestion(1);
        });
    };

    getQuestion();

    $truthTmpl.find('#change').click(function() {
        $truthTmpl.find('.card').addClass('move-left');
        getQuestion();
    });

    $truthTmpl.find("#submit").click(function() {
        console.log('button works ' + $truthTmpl.find("#new-question").val());
        var url = 'api/truth';
        var newQuestion = {
            question: $truthTmpl.find("#new-question").val(),
            type: 'truth'
        };
        HttpRequest.http_request_with_data_authentication(
            'POST',
            url,
            JSON.stringify(newQuestion),
            function successCallback(data){
                $truthTmpl.find('#myModal').modal('hide');
                console.log('works');
                $truthTmpl.find('.card').addClass('move-left');
                getQuestion();
            },
            function errorCallback(data) {
                console.log('fail');
                window.location.hash = 'login';
            }
        );
    });

    $truthTmpl.find("#logout").click(function() {
        window.localStorage.removeItem('username');
        window.location.hash = '';
    });
};

var truthView = new TruthView();

module.exports = truthView;
