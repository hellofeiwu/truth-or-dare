'use strict';

var dareTmpl = require('./dare.handlebars');

var TruthView = function () {
    this.$container = $('<div />');
};

TruthView.prototype.render = function () {
    var url = '/api/dare';
    var self = this;

    $.getJSON(url, function(data){
        var dare = data;
        var i = Math.floor((Math.random() * dare.length));
        var $dareTmpl = $(dareTmpl({
            question: dare[i].question
        }));
        $dareTmpl.find('#change').click(function() {
            if (dare.length == 1) {
                alert('This is the last question.');
            }else {
                dare.splice(i,1);
                i = Math.floor((Math.random() * dare.length));
                $dareTmpl.find('#question').html(dare[i].question);
            }
        });
        self.$container.empty().append($dareTmpl);
    });
};

var dareView = new TruthView();

module.exports = dareView;
