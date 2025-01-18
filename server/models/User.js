// models/User.js
const mongoose = require('mongoose');

// Create the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum: ['admin', 'user'],
    default: 'user'
    
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
