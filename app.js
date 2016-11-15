var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var app = express();

//implement express staice
app.use(express.static('public'));

//bodyParser implement
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//implements models -- models module can be accessed	
var models = require('./models');

models.User.sync({})
	.then(function(){
		return models.Page.sync({})
	})
	.catch(console.error);

//implements router -- app can use our router
//to access wiki pages
var wikiRouter = require('./routes/wiki');
app.use('/wiki', wikiRouter);


//configure nunjucks
nunjucks.configure('views', {noCache:true})

//specifies the file should be viewed as HTML
app.set('view engine', 'html'); 
//specifies to render file as html 
app.engine('html', nunjucks.render); 

app.listen(3000);





