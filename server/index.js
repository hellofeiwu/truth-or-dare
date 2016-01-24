var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: '../client' });   
});

app.use(express.static('../client'));

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("I'm listening on port " + process.env.PORT);
});