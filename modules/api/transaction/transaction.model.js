'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let _schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Transaction', _schema);