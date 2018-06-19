var mongoose = require('mongoose');


var PostScema = new mongoose.Schema({
    msg: String,
    author : {type: mongoose.Schema.Types.ObjectId ,ref :'User'}
});

module.exports = mongoose.model('Posts', PostScema);