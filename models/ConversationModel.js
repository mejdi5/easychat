const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({

    senderId: {
        type: String,
    },
    receiverId: {
        type: String,
    },
    /*ReadFromReceiver: {
        receiver: {
            type: String
        },
        isRead: {
            type: Boolean,
            default: true
        } 
    },*/
},
{timestamp: true}
);

module.exports = Conversation = mongoose.model('Conversation', ConversationSchema);