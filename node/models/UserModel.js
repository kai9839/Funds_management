const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sex: String,
  age: Number,
  addr: String,
  birth: Date,
});

module.exports = User = mongoose.model('user', UserSchema);