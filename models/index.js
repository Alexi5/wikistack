var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var pageContent = {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	}, 
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	}, 
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	}
}

var userContent = {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}, 
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}

}

//virtual field
//getter method
var virtualFields = {
	//route function will be called whenever user
	//goes to a wiki page
	route: {
		function(){
			return ('/wiki/' + this.urlTitle);
		}
	}, 
	hooks: {
		beforeValidate: function(page){
			if(page.title){ //if instance has a title
				//make new urlTitle derived from this title
				page.urlTitle = page.title.replace(/\s+/g,'_').replace(/\W/g,'');
			} 
			else {
				//randomly generate string
				page.urlTitle = Math.random().toString(36).substring(2, 7);

			}
		}
	}
	///\w/g -> (global) replaces nonalphanumeric (removes)
	///\s+/g -> (global) inserts _ in place of spaces
}


var User = db.define('user', userContent)
var Page = db.define('page', pageContent, virtualFields)


module.exports = {
	User: User, 
	Page: Page
}
