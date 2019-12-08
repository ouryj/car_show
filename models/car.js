let mongoose     = require('mongoose');
let Comment      = require('../models/comment');

let carSchema      = new mongoose.Schema({
    carname: String,
    image: String,
    model: String,
    make:  String,
    year: Date,
    owner:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Comment 
        }
    ],
    posted:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Car',carSchema);