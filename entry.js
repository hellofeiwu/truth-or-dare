window.jQuery = require('jquery');
window.$ = window.jQuery;

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

require("./main.css");
var HomeView = require("./views/home-view");

$(function(){
    HomeView.render();
    console.log(homeTmpl);
});