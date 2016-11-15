var express = require('express');
var router = express.Router();
var models = require('../models');

var Page = models.Page;
var User = models.User;

//main page route --> retrieves wiki page
router.get('/', function(req, res){
	res.redirect('/');
});


//post page route --> submits new page to database
router.post('/', function(req, res){
	
	//new page is created
	//req.body.title => fetches placeholder
	//and that page title is set to the submitted title 
	var page = Page.build({
    	title: req.body.title, //value: placeholder
    	content: req.body.content
  	});

	page.save()
		.then(function(newPage){
			res.redirect(newPage.route);
		})
		.catch(function(){
			console.log(error)
		});

});

//add page route --> brings up the add page form
router.get('/add', function(req, res){
	res.render('addpage');
})

//single page route --> fetches single page
router.get('/:urlTitle', function(req, res, next){
	
	Page.findAll({
 		 where: {
 		 	urlTitle: req.params.urlTitle
 		 }
	})
	.then(function(foundPage){
		// res.json(foundPage);
		res.render('wikipage', {page:foundPage[0]});
	})
	.catch(next);
	
	
})

module.exports = router;
