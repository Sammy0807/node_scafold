
var express = require('express');
var router = express.Router();


// Get HomePage
router.get('/', function(req, res){
	res.render('index');
});

router.get('/login', function(req, res){
	res.render('login');
});


function ensureAuthenticated(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}else{
		req.flash('error_msg', 'You are not logged in');
		}
}
module.exports = router;
