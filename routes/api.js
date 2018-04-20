'use strict';
let express = require('express');
let router = express.Router();
let controllers = require('../controller')


router.get('/:resource', function(req, res, next){

	let resource = req.params.resource
	let controller = controllers[resource]

	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: '+resource
		})
		return
	}

	controller.find(req.query, function(err, results){
	if(err){
			res.json({
				confirmation:'Fail',
				message: err
			})
			return
		}
			res.json({
				confirmation: "Success",
				resource: results
				})
		})
	})


router.get('/:resource/:id', function(req, res, next){

	let resource = req.params.resource
	let id = req.params.id
	let controller = controllers[resource]

	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: '+resource
		})
		return
	}
	controller.findById(id, function(err, results){
		if(err){
			res.json({
			confirmation: 'fail',
			message: err
		})
		return
		}
		res.json({
			confirmation: 'Success',
			result: results
		})
	})
})


router.post('/:resource', function(req, res, next){
	let resource = req.params.resource
	let controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: '+resource
		})
		return
	}

 controller.create(req.body, function(err, result){
 	if(err){
			res.json({
			confirmation: 'fail',
			message: 'Not Found'
		})
		return
		}
		res.json({
			confirmation: 'Success',
			result: result
		})
	})
})




router.put('/:resource/:id', function(req, res, next){
	let resource = req.params.resource
	let id = req.params.id
	let controller = controllers[resource]

	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: '+resource
		})
		return
	}
	controller.findByIdAndUpdate(id, req.body, function(err, result){
		if(err){
			res.json({
			confirmation: 'fail',
			message: 'Not Found'
		})
		return
		}
		res.json({
			confirmation: 'Successfully Updated',
			comments: result
		})
	})
})

router.delete('/:resource/:id', function(req, res){
	let resource = req.params.resource
	let id = req.params.id
	let controller = controllers[resource]

	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: '+resource
		})
		return
	}
	controller.findByIdAndRemove(id, function(err){
		if(err){
			res.json({
			confirmation: 'fail',
			message: 'Not Found'
		})
		return
		}
		res.json({
			confirmation: 'Successfully deleted'
		})
	})
})

module.exports = router;
