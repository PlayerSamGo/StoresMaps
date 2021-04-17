'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AuthenticationTokenSchema = new Schema({
    userId: String,
    deviceFingerPrint: String,
    email: {
      type:String,
      required: [true, 'email.required'],
      validate: {
          validator: function(v) {
            return !(/^\s+$/.test(v));
          },
          message: 'email.blank'
      },
      minlength: [8, 'email.minlength'],
      maxlength: [320, 'email.maxlength']
    },
    password: {
        type:String,
        required: [true, 'password.required'],
        validate: {
          validator: function(v) {
            return !(/^\s+$/.test(v));
          },
          message: 'password.blank'
        },
        minlength: [8, 'password.minlength'],
        maxlength: [320, 'password.maxlength']
    },
    token: {
        type:String,
        required: [true, 'token.required']
    },
    tokenCreation:Number,
    tokenExpiration:Number
});

module.exports = mongoose.model('AuthenticationToken', AuthenticationTokenSchema);
