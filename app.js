var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LoginWithPassport');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/user');
var api = require('./routes/api');

//initialise app
var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'Public')));

//Express session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return{
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

//connect flash
app.use(flash());

//Global vars
app.use(function (req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

function handleError(error, req, res, next){
	var output = {
		ella:{
			name: error.name,
			message:error.message,
			text: error.toString()
		}
	}
	var statusCode = error.status || 500;
	res.status(statusCode).json(output);
}
app.use([handleError])

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// set port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
	console.log('server started on port '+app.get('port'));
});