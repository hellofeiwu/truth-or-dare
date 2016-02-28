var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: '../client' });   
});

app.get('/api/truth', function (req, res) {
    res.json([
              {
                "question": "你们家里谁的脾气最大"
              },
              {
                "question": "现在想被有钱人保养么"
              },
              {
                "question": "你会做菜么"
              },
              {
                "question": "每天上网几个小时"
              },
              {
                "question": "请说出在座谁昨天没有洗澡"
              },
              {
                "question": "今天晚上要做什么"
              },
              {
                "question": "异性知己有几个"
              },
              {
                "question": "上厕所后洗手么"
              },
              {
                "question": "你最受不了别人对你做什么"
              },
              {
                "question": "觉得失去什么最可怕"
              },
              {
                "question": "你觉得自己什么时候身体发育成熟的"
              }
            ]);
});

app.use(express.static('../client'));

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("I'm listening on port " + process.env.PORT);
});