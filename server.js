var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var http = require('http').Server(app);


app.get("/menu", function(req,res){
  var menuObject= require('./menu.json');
    return res.json(menuObject);
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
