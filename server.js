var express = require('express');
var app = express();
var port = 3000;

var routes = require('./routes.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port,"localhost", function () {//change to computer ip address
    console.log('Server started on port ' + port);
});