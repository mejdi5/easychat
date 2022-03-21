const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    conversation: {
        type: String,
    },
    sender: {
        type: String
    }, 
    text: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
        unique: true
    },
},{timestamp: true});

module.exports = Message = mongoose.model('Message', messageSchema)