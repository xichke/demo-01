'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let _schema = new Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator'
  },
  phone: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  dob: {
    type: Date
  },
  email: {
    type: String,
    trim: true
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

_schema.index({
  operator: 1,
  phone: 1
}, {
  unique: true
});

mongoose.model('Client', _schema);