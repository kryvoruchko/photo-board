const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true, max: 100 },
  isDraft: { type: Boolean, required: false, default: false },
  images: { type: Array, default: [] }
});

module.exports = mongoose.model('Board', schema);