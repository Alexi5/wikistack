var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var app = express();


//configure nunjucks
nunjucks.configure('views', {noCache:true})
app.set('view engine', 'html'); //specifies the file should be viewed as HTML
app.engine('html', nunjucks.render); //specifies to render file as html 

