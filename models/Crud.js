'use strict';
let mongoose = require('mongoose');

let CrudSchema = new mongoose.Schema({
  comment: {type: String, default:''},
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crud', CrudSchema);
