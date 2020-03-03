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
  fb: {
    type: String,
    trim: true
  },
  youtube: {
    type: String,
    trim: true
  },
  googlePlus: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  instagram: {
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
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: Boolean,
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Salon', _schema);