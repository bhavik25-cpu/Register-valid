const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z]+$/.test(value),
      message: 'First Name must contain only alphabets.',
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z]+$/.test(value),
      message: 'Last Name must contain only alphabets.',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) =>
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
      message: 'Invalid email format.',
    },
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: (value) =>
        new Date().getFullYear() - new Date(value).getFullYear() > 14 &&
        new Date().getFullYear() - new Date(value).getFullYear() < 99,
      message: 'Age must be between 14 and 99 years.',
    },
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
