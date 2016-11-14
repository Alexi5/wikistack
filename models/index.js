var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhose:5432/wikistack');

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

var getMethod = {
	route: {
		function(){
			return ('/wiki/' + this.urlTitle);
		}
	}
}


var User = db.define('user', userContent)
var Page = db.define('page', pageContent, getMethod)


module.exports = {
	User: User, 
	Page: Page
}