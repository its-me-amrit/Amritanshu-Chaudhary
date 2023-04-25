const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  primaryText: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
