const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    description: String
},{versionKey:false,timestamps:true});

module.exports = mongoose.model('Category', categorySchema);
