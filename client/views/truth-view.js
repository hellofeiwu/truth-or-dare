'use strict';

var truthTmpl = require('./truth.handlebars');

var TruthView = function () {
    this.$container = $('<div />');
};

TruthView.prototype.render = function () {
    //this.$container = $('<div></div>');
    var url = '/api/truth';
    var self = this;
    // make api call and response
    $.getJSON(url, function (data) {
        var truth = data;
        var i = Math.floor((Math.random() * truth.length));
        var $truthTmpl = $(truthTmpl({
            question: truth[i].question
        }));
        $truthTmpl.find('#change').click(function() {
            if (truth.length == 1) {
                alert('This is the last question.');
            }else {
                truth.splice(i,1);
                i = Math.floor((Math.random() * truth.length));
                $truthTmpl.find('#question').html(truth[i].question + '?');
            }
        });
        self.$container.empty().append($truthTmpl);
    });
};

var truthView = new TruthView();

module.exports = truthView;
