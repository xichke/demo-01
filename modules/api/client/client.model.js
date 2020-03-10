'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  utils = require('../../shared/utils');

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
  point: Number,
  updated: {
    type: Date
  },
  visit: Number,
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

_schema.query.yesterday = function() {
  let {
    start,
    end
  } = utils.date.yesterday();
  return this.find({
    checkedIn: {
      $gte: start,
      $lte: end
    }
  });
};

mongoose.model('Client', _schema);