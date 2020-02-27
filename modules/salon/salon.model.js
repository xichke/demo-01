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
  placeId: {
    type: String,
    trim: true
  },
  fb_page: {
    type: String,
    trim: true
  },
  youtube_channel: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  phone: {
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

mongoose.model('Salon', _schema);