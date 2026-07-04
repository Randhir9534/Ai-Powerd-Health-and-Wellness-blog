const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [],
    image:String,
    likes: [],
    date: { type: Date, default: Date.now },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' }
},{versionKey:false,timestamps:true});

module.exports = mongoose.model('Blog', blogSchema);