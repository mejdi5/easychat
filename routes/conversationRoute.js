const router = require('express').Router();
const Conversation = require('../models/ConversationModel');

//post new conversation
router.post("/", async (req, res)=> {
    const newConversation = new Conversation(req.body)
    try {
        const firstCheckConversation = await Conversation.find({
            senderId: newConversation.senderId ,
            receiverId: newConversation.receiverId
        }) 
        const secondCheckConversation =  await Conversation.find({
            senderId: newConversation.receiverId,
            receiverId: newConversation.senderId 
        })

        if (firstCheckConversation.length === 0 && secondCheckConversation.length === 0 && newConversation !== undefined) {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
        } 
        
    } catch (error) {
        res.status(500).json(error)
    }
})


//get conversations of one user
router.get("/:userId", async (req, res)=> {
    try {
        const sentConversations = await Conversation.find({
            senderId: req.params.userId,
            receiverId: {$ne: req.params.userId} 
        }) 
        const receivedConversations = await Conversation.find({
            receiverId: req.params.userId,
            senderId: {$ne: req.params.userId}
        })
        const autoConversation = await Conversation.find({
            receiverId: req.params.userId,
            senderId: req.params.userId
        })
        const conversations = [...sentConversations, ...receivedConversations, ...autoConversation].filter(conversation => conversation !== undefined)
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get One Conversation
router.get('/:firstUser/:secondUser', async (req, res) => {
    const {firstUser}  = req.params;
    const {secondUser}  = req.params;
    try {
    const conversation = await Conversation.findOne(
        {senderId: firstUser, receiverId: secondUser} ||
        {senderId: secondUser, receiverId: firstUser});
    res.json(conversation);
    } catch (error) {
    console.log(error);
    }
});


// delete a conversation
router.delete('/delete/:conversationId', async (req, res) => {
    const  _id  = req.params.conversationId;
    try {
    const conversation = await Conversation.findOneAndDelete({ _id });
    res.json({ msg: "conversation deleted", conversation });
    } catch (error) {
    console.log('error:', error);
    }
});
/*
//read conversation
router.put('/read/:conversationId', async (req, res) => {
    const  _id  = req.params.conversationId;

    try {
        const conversation = await Conversation.findByIdAndUpdate(_id, 
        {senderId: req.body.senderId, 
        receiverId: req.body.receiverId, 
        ReadFromReceiver: req.body.ReadFromReceiver
        })
        res.status(200).json(conversation)
    } catch (error) {
        console.log('error:', error)
    }
})
*/

module.exports = router;