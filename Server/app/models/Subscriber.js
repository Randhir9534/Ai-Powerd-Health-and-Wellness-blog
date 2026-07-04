const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    subscribedOn: { type: Date, default: Date.now }
},{versionKey:false,timestamps:true});

module.exports = mongoose.model('Subscriber', subscriberSchema);