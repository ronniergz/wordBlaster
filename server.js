var express = require('express');
var app = express();
const port = process.env.PORT || 8000

app.use(express.static('./public')); //Serves resources from public folder

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/app', function (req, res) {
  res.sendFile(__dirname + '/public/app.html');
});

app.listen(port);