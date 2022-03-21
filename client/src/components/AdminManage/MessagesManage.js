import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMessages } from '../../Redux/actions/messageActions'
import { format } from 'timeago.js'


function MessagesManage({setToggle, conversationId, groupConversationId, userId, setConversationId, setGroupConversationId}) {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const messages = useSelector((state) => state.messages);


    useEffect(() =>
    conversationId !== '' && 
        dispatch(getMessages(conversationId))
    , [conversationId]);


    useEffect(() =>
    groupConversationId !== '' && 
        dispatch(getMessages(groupConversationId))
    , [groupConversationId]);


return (
    <>
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <p className="manage"
        onClick={() => setToggle("users") }
        >back to users</p>
        <p className="manage"
        onClick={() => setToggle("conversations") }
        >{`${users.find(u => u._id === userId).firstName} private conversations `}</p>
        <p className="manage"
        onClick={() => setToggle("groupConversations")}
        >{`${users.find(u => u._id === userId).firstName} group conversations `}</p>
    </div>
    <div className="chat_bodies">
    {messages && messages
    .filter(m => m.conversation === conversationId || m.conversation === groupConversationId)
    .map((message, index) => {
    const Sender =  users.find(el => el._id === message.sender)
    return (
    <div key={message._id}>
    <p className={index%2 === 0 ? "chat_message" : "chat_receiver" } style={{backgroundColor:'white', cursor:'auto'}}>
    <span className="chat_name">{Sender.firstName}</span>
    {message.text}
    <span className="chat_timestamp">{format(message.date)}</span>
    </p>
    </div>
    )} 
    )}
    </div>
    </>   
)}

export default MessagesManage