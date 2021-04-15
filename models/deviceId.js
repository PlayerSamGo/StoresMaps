'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DeviceIdSchema = new Schema({
    userId: String,
    deviceFingerPrint: String,
    deviceToken: String,
    android: Boolean,
    ios: Boolean,
    numNotifications: Number
});

module.exports = mongoose.model('DeviceId', DeviceIdSchema);
