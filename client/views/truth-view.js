'use strict';

var $ = require('jquery');
var truthTmpl = require('./truth.handlebars');

var TruthView = function () {
    this.$container = $('<div />');
};

TruthView.prototype.render = function () {
    var url = '/api/truth';
    var self = this;
    
    // make api call and response
    var init = function() {
        $.getJSON(url, function (data) {
        var truth = data;
       
        var $truthTmpl = $(truthTmpl({
            question: truth.question
        }));
        
        $truthTmpl.find('#change').click(function() {
            init();
        });
        self.$container.empty().append($truthTmpl);
        
        $truthTmpl.find("#submit").click(function() {
            console.log('button works ' + $truthTmpl.find("#new-question").val());
            var url = 'api/truth';
            var newQuestion = {
                question: $truthTmpl.find("#new-question").val(),
                type: 'truth'
            };
            $.ajax({
                type: "POST",
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(newQuestion),
                success: function(data){
                    $truthTmpl.find('#myModal').modal('hide');
                    console.log('works');
                    location.reload();
                },
                error: function(data) {
                    console.log('fail');
                },
                dataType: 'json'
            });
        });
    });
    };
    
    init();
};

var truthView = new TruthView();

module.exports = truthView;
