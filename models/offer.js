'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OfferSchema = new Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Offer', OfferSchema);
