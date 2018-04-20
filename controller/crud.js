'use strict'

let Crud = require('../models/crud');

module.exports = {
	find: function(params, callback){
		Crud.find(params, function(err, comment){
			if(err){
				callback(err, null)
				return
			}
			callback(null, comment)
		})
},

	findById: function(id, callback){
		Crud.findById(id, function(err, comment){
			if(err){
				callback(err, null)
				return
			}
			callback(null, comment)
		})
	},
	update: function(id, params, callback){
		Crud.findByIdAndUpdate(id, params, {new:true}, function(err, comment){
			if(err){
				callback(err, null)
				return
			}
		callback(null, comment)
		})
	},
	create: function(params, callback){
		Crud.create(params, function(err, comment){
			if(err){
				callback(err, null)
				return
			}
			callback(null, comment)
		})
	},
	delete: function(id, callback){
		Crud.findByIdAndRemove(id, function(err){
			if(err){
				callback(err, null)
				return
			}
		callback(null, null)
		})
	}
}
