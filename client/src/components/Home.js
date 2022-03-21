import React,{useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../Redux/actions/authActions';
import { getConversations, postConversation } from '../Redux/actions/conversationActions'
import { getGroupConversations } from '../Redux/actions/groupConversationActions'
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import { io } from "socket.io-client";
import {getMessages, postMessage} from '../Redux/actions/messageActions'
import {getOneConversation} from '../Redux/actions/conversationActions'
import { Navigate } from 'react-router-dom';




function Home({manage, setManage}) {
    

    const dispatch = useDispatch();
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const conversations = useSelector((state) => state.conversations);
    const adminConversation = useSelector((state) => state.adminConversation);
    const socket = useRef();
    const messages = useSelector((state) => state.messages)
    const [notifications, setNotifications] = useState([]);
    const [publicNotifications, setPublicNotifications] = useState([]);

//get current user
useEffect(() => {
    dispatch(getAuthUser());
    //(!user || user._id === undefined) && <Navigate to="/"/>
}, []); 

//get conversations of current user
useEffect(() => 
    dispatch(getConversations(user?._id))
, []);

//get conversation between current user and admin
useEffect(() => {
    if (!user?.isAdmin) {
    dispatch(getOneConversation(users.find(u => u.isAdmin)._id, user?._id))
}}, []);

//get group conversations of current user
useEffect(() => {
    dispatch(getGroupConversations(user?._id));
}, []);

//get messages of current chat
useEffect(() => {
    if (!user?.isAdmin && currentChat && currentChat !== adminConversation) {
    dispatch(getMessages(currentChat?._id))
}}, [currentChat])

//post conversations of current user
useEffect(() => 
!user?.isAdmin && users
.filter(u => !u.isAdmin)
.map(el => {
const newConversation = {senderId: user?._id || el._id, receiverId: el._id || user?._id}
!conversations.some(c => c.senderId === newConversation.senderId && c.receiverId === newConversation.receiverId) &&
dispatch(postConversation(newConversation,user?._id))
}), [conversations]);

//post conversations of the admin
useEffect(() => 
user?.isAdmin && users
.map(el => {
const newConversation = {senderId: user?._id, receiverId: el._id}
!conversations.some(c => c.senderId === newConversation.senderId && c.receiverId === newConversation.receiverId) &&
dispatch(postConversation(newConversation,user?._id))
}), [conversations]);


    let url = process.env.NODE_ENV === 'production'
    ? "https://easychat2.herokuapp.com/"
    : "http://localhost:5000"

//socket
useEffect(() => 
    socket.current = io(url)
, []);

//get online users
useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", Users => {
    setOnlineUsers(
    users.filter((el) => Users.some((u) => u.userId === el._id)))
    });
}, []);

        
    

    

//get realtime private messages 
useEffect(() => 
currentChat?.senderId && currentChat?.receiverId && 
socket.current.on("getMessage", (newMessage) => {
dispatch(postMessage(newMessage, currentChat._id))
}), [messages]);

//get realtime private notifications
useEffect(() => 
(!currentChat || !currentChat?.senderId) && 
socket.current.on("getNotification", ({chatId, from, content}) => {
    setNotifications([...notifications, {chatId, from, content}])
})
, [notifications])

//get realtime public messages 
useEffect(() => 
currentChat?.members &&
socket.current.on("getPublicMessage", ({conversation, senderId, members, text }) => 
dispatch(postMessage({
    conversation,
    sender: senderId,
    text,
    },currentChat._id))
)
, [messages]);

//get realtime public notifications
useEffect(() => 
(!currentChat || !currentChat?.members) && 
socket.current.on("getPublicNotification", ({chatId, from, content}) => {
    setPublicNotifications([...publicNotifications, {chatId, from, content}])
})
, [publicNotifications])


if (!manage) {
return (
<div className="app">
	<div className="app__body">

        <Sidebar 
        currentChat={currentChat} 
        setCurrentChat={setCurrentChat}
        onlineUsers={onlineUsers}
        notifications={notifications} 
        setNotifications={setNotifications}
        publicNotifications={publicNotifications} 
        setPublicNotifications={setPublicNotifications}
        />

        <Chat 
        currentChat={currentChat} 
        socket={socket}
        setManage={setManage}
        notifications={notifications} 
        setNotifications={setNotifications}
        />

	</div>
</div>
    )}

}

export default Home