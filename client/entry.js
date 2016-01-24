window.jQuery = require('jquery');
window.$ = window.jQuery;

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

require("./main.css");
var router = require("./router");

$(function(){
    router.init($('body'));
});