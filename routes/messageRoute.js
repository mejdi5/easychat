const router = require('express').Router();
const Message = require('../models/MessageModel');
const crypto = require('crypto');

function encrypt(text) {
    encryptalgo = crypto.createCipher('aes192', 'abcdefgh');
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}

function decrypt(encrypted) {
    decryptalgo = crypto.createDecipher('aes192', 'abcdefgh');
    let decrypted = decryptalgo.update(encrypted, 'hex', 'utf8');
    decrypted += decryptalgo.final('utf8');
    return decrypted;
}

//post new message
router.post("/", async (req, res)=> {
    const newMessage = new Message(req.body)
    try {
        newMessage.text = encrypt(newMessage.text)
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
})


//get messages of a conversation
router.get("/:conversationId", async (req, res)=> {
    try {
        const msgs = await Message.find({
            conversation: req.params.conversationId,
        })
        let messages = msgs.filter(m => m.conversation !== undefined)
        messages = messages.map(message =>  message = {
            _id: message._id,
            conversation: message.conversation,
            text: decrypt(message.text),
            date: message.date
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//get one message
router.get('/message/:_id', async (req, res) => {
    const {_id}  = req.params;
    try {
    const message = await Message.findOne({_id});
    res.json(message);
    } catch (error) {
    console.log(error);
    }
});


// delete a message
router.delete('/delete/:messageId', async (req, res) => {
    const  _id  = req.params.messageId;
    try {
    const message = await Message.findOneAndDelete({ _id });
    res.json({ msg: "message deleted", message });
    } catch (error) {
    console.log(error);
    }
});

module.exports = router;