import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {deleteConversation} from '../../../Redux/actions/conversationActions'
import noAvatar from '../../../images/noAvatar.png'
import notificationIcon from '../../../images/pngtree-vector-notification-icon-png-image_1022639.jpg'


function AllView({currentChat, setCurrentChat, notifications, setNotifications, setOnlineView, readingConversation}) {

    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.conversations);
    const adminConversation = useSelector((state) => state.adminConversation);
    const messages = useSelector((state) => state.messages);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const UserString = useSelector(state => state.UserString)


return (
<>
<h6 onClick={() => setOnlineView(true)} style={{marginLeft:'40%', cursor:'pointer', fontWeight:'bold'}}>All</h6>
        {conversations  && conversations
        .map((conversation, index) => {
            const otherUser = users
            .filter(u => u.firstName.toLowerCase().startsWith(UserString.toLowerCase().trim()) || u.lastName.toLowerCase().startsWith(UserString.toLowerCase().trim()))
            .find(u => u._id !== user._id && (u._id === conversation.receiverId || u._id === conversation.senderId))
            if ( otherUser && !otherUser.isAdmin ) {
            return (
            <div key={index} 
            className={
                currentChat === conversation 
                ? "sidebarchatactive" 
                : (notifications.some(n => n.chatId === conversation._id) && (!currentChat || currentChat !== conversation)) 
                ? "readsidebarchat"
                : "sidebarchat"}
            onClick={() => readingConversation(conversation)}
            >    
                <div 
                style={{display:'flex'}}>
                <img
                crossOrigin='anonymous'
                className="conversationImg"
                src={
                otherUser?.picture 
                ? otherUser.picture?.path 
                : noAvatar
                }
                alt=""
                />
                <div className="sidebarChat_info">
                    <h2 
                    style={{fontWeight:'bold'}}
                    > {`${otherUser?.firstName} ${otherUser?.lastName}`.substring(0,10)} </h2>
                </div>
                {notifications.some(n => n.chatId === conversation._id) && (!currentChat || currentChat !== conversation) 
                &&
                <img 
                className="iconImg"
                src={notificationIcon} 
                alt=""
                />
                }
                </div>      
            </div>
            )}
        }
        )}
            {messages?.some(m => m.conversation === adminConversation?._id) && 
            <div className={
                currentChat === adminConversation 
                ? "sidebarchatactive" 
                : (notifications.some(n => n.chatId === adminConversation._id) && (!currentChat || currentChat !== adminConversation)) 
                ? "readsidebarchat"
                : "sidebarchat"}> 
            <div onClick={() => readingConversation(adminConversation)} style={{display:'flex'}}>
                <img
                crossOrigin='anonymous'
                className="conversationImg"
                src={
                users.find(u => u.isAdmin)?.picture 
                ? users.find(u => u.isAdmin).picture.path 
                : noAvatar
                }
                alt=""
                />
                <div className="sidebarChat_info">
                    <h2 
                    style={{fontWeight:'bold'}}
                    > {`${users.find(u => u.isAdmin)?.firstName} ${users.find(u => u.isAdmin)?.lastName}`.substring(0,10)} <span style={{fontWeight:'normal'}}>(Admin)</span></h2>
                </div>
                {notifications.some(n => n.chatId === adminConversation._id) && (!currentChat || currentChat !== adminConversation) 
                &&
                <img 
                className="iconImg"
                src={notificationIcon} 
                alt=""
                />
                }
            </div>    
            </div>
            }
            <div className={currentChat === conversations.find(c => c.senderId === user._id && c.receiverId === user._id) ? "sidebarchatactive" : "sidebarchat"}> 
                <div onClick={() => setCurrentChat(conversations.find(c => c.senderId === user._id && c.receiverId === user._id))} style={{display:'flex'}}>
                <img
                crossOrigin='anonymous'
                className="conversationImg"
                src={
                user?.picture 
                ? user.picture.path 
                : noAvatar
                }
                alt=""
                />
                <div className="sidebarChat_info">
                    <h2 
                    style={{fontWeight:'bold'}}
                    > {`${user?.firstName} ${user?.lastName}`.substring(0,10)} </h2>
                </div>
                </div>    
                
            </div>
</>
)
}

export default AllView