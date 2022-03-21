const router = require('express').Router();
const GroupConversation = require('../models/GroupConversationModel');


//post new conversation
router.post("/", async (req, res)=> {
    const newGroupConversation = new GroupConversation(req.body)
    try { 
        const savedGroupConversation = await newGroupConversation.save()
        res.status(200).json(savedGroupConversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get group conversations of one user
router.get("/:userId", async (req, res)=> {
    try {
        const userGroupConversations = await GroupConversation.find({members: { $in: [
            req.params.userId
        ] }})
        res.status(200).json(userGroupConversations)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a group conversation
router.delete('/delete/:groupConversationId', async (req, res) => {
    const  _id  = req.params.groupConversationId;
    try {
    const groupConversation = await GroupConversation.findOneAndDelete({ _id });
    res.json({ msg: "group conversation deleted", groupConversation });
    } catch (error) {
    console.log(error);
    }
});

module.exports = router;