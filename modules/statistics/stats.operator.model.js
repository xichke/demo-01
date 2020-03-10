'use strict';

const mongoose = require('mongoose');

let _schema = new mongoose.Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator'
  },
  date: Date,
  newClients: Number,
  returnClients: Number,
  transactions: Number
}, {
  collection: 'stats.operator'
});

_schema.index({
  operator: 1,
  date: 1
}, {
  unique: true
});

mongoose.model('StatsOperator', _schema);