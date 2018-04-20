var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');


// Define all the Crud Functions for users and User
function search(params, callback){
	User.find(params, function(err, users){
		if(err){
			callback(err, null)
			return
		}
		callback(null, users)
	});
}

function updateUserRecord(id, params, callback){
	User.findByIdAndUpdate(id, params, {new:true}, function(err, user){
		if(err){
			callback(err, null)
			return
		}
		callback(null, user)
	})
}

function removeUserDetails(id, callback){
	User.findByIdAndRemove(id, function(err){
		if(err){
			callback(err, null)
			return
		}
		callback(null, null)
	})
}


// Create all the API end points for users

//Register a User
router.post('/register', function(req, res, next){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//Validation
	req.checkBody('firstname', 'First name is required').notEmpty();
	req.checkBody('lastname', 'Last name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not Valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	var newUser = new User({
				firstname: firstname,
				lastname: lastname,
				email: email,
				username: username,
				password: password
			});

	if (errors){
		res.json({
			confirmation: 'fail',
			message: errors
		})
		console.log(errors);
	}else{
		User.createUser(newUser, function(err, user){
			if(err){
				throw err;
			}
			res.json({
				confirmation: 'success',
				results: user
			})
		});
	}
});

// local strategy
passport.use(new LocalStrategy(
	function(username, password, done){
			User.getUserByUsername(username, function(err, user){
				if(err) throw err;
				if(!user){
					return done(null, false);
				}
User.comparePassword(password, user.password, function(err, isMatch){
					if(err) throw err;
					if(isMatch){
						return done(null, user);
					}else{
						return done(null, false, {message: 'Invalid password'});
				}
		});
	});
}));
// serialise and deserialise passport
passport.serializeUser(function(user, done){
			done(null, user.id);
		});
passport.deserializeUser(function(id, done){
			User.getUserById(id, function(err, user){
				done(err, user);
			});
	});
	// passport local authentication
router.post('/login',
			passport.authenticate('local', {failWithError: true}),
			(req, res)=>{
			return res.json({loggedin: req.user.username})
			}
			);

router.get('/logout', function(req, res){
		req.logout();
		res.json({
			confirm: 'Successfully logged out'
		})
		});

//Retrieve all the Registered Users
router.get('/register', function(req, res, next){

	search(req.query, function(err, results){
		if(err){
			res.json({
				confirmation: 'failed',
				message: err
			})
			return
		}
		res.json({
			confirmation: 'Success',
			Users: results
		})
	})
});



// update user details
router.put('/register/:id', function(req, res, next){
	let id = req.params.id

	updateUserRecord(id, req.body, function(err, user){

		if(err){
			res.json({
				confirm: 'fail',
				message: 'not found'
			})
			return
		}
		res.json({
			confirm: 'Success',
			result: user
		})
	})
})

//Delete user details
router.delete('/register/:id', function(req, res){
	removeUserDetails(req.params.id, function(err, user){
		if(err){
			res.json({
				confirm: 'failed',
				message: err
			})
		}
		res.json({
			confirm: 'sucessfully deleted '+ req.params.firstname,
			message: user
		})
	})
})

// Retrieve a single User by Id
router.get('/register/:id', function(req, res, next){

 User.getUserById(req.params.id, function(err, result){
	 if(err){
		 res.json({
			 confirmation: 'failed',
			 message: err
	 })
	 return
 }
 res.json({
	 confirmation: 'Success',
	 User: result
 })
});
})

handleError = (error, req, res, next) => {
	var output = {
		ella:{
			name: error.name,
			message:error.message,
			text: error.toString()
		}
	}
	var statusCode = error.status || 401;
	res.status(statusCode).json(output);
}

router.use([handleError]);

module.exports = router;
