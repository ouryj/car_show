let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    text:String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String

    },
    posted:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Comment',commentSchema);