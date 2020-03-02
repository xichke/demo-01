'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let _schema = new Schema({
  name: {
    type: String,
    unique: 'name has already existed',
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  salons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon'
  }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Client', _schema);