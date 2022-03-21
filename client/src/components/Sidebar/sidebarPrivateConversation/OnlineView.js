import React from 'react'
import { useSelector } from 'react-redux';
import {deleteConversation} from '../../../Redux/actions/conversationActions'
import noAvatar from '../../../images/noAvatar.png'
import onlineIcon from '../../../images/pngtree-whatsapp-color-icon-png-image_974074.jpg'
import notificationIcon from '../../../images/pngtree-vector-notification-icon-png-image_1022639.jpg'


function OnlineView({currentChat, setCurrentChat,onlineUsers, notifications, setNotifications, setOnlineView, readingConversation}) {

    const conversations = useSelector((state) => state.conversations);
    const user = useSelector((state) => state.user);
    const UserString = useSelector(state => state.UserString)


return (
<>
<h6 onClick={() => setOnlineView(false)} style={{marginLeft:'40%', cursor:'pointer', color:'green', fontWeight:'bold'}} >Online</h6>
        {onlineUsers.filter(onlineUser => !onlineUser?.isAdmin && onlineUser?._id !== user?._id).length > 0
        ? 
        onlineUsers
        .filter(onlineUser => !onlineUser.isAdmin && onlineUser._id !== user?._id)
        .filter(u => u.firstName.toLowerCase().startsWith(UserString.toLowerCase().trim()) || u.lastName.toLowerCase().startsWith(UserString.toLowerCase().trim()))
        .map(onlineUser => 
            (
            <div key={onlineUser?._id}             
            onClick={() => readingConversation(conversations
            .filter(c => c.senderId !== c.receiverId)
            .find(c => (c.senderId === user?._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user?._id))
            )
            }>
                <div className={currentChat === conversations
                    .filter(c => c.senderId !== c.receiverId)
                    .find(c => (c.senderId === user?._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user?._id)) 
                    ? "sidebarchatactive"
                    : (notifications.some(n => n.chatId === conversations
                        .filter(c => c.senderId !== c.receiverId)
                        .find(c => (c.senderId === user?._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user?._id)
                        )._id)
                    &&
                    (!currentChat || currentChat !== conversations
                    .filter(c => c.senderId !== c.receiverId)
                    .find(c => (c.senderId === user?._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user?._id))
                    )) 
                    ? "readsidebarchat"
                    :"sidebarchat" }>
                    <img
                    crossOrigin='anonymous'
                    className="conversationImg"
                    src={
                    onlineUser.picture 
                    ? onlineUser.picture.path
                    : noAvatar
                    }
                    alt=""
                    />
                    <div className="sidebarChat_info">
                        <h2>{onlineUser.firstName} {onlineUser.lastName}</h2>
                    </div>
                    <img 
                    className="iconImg"
                    src={onlineIcon} 
                    alt=""
                    />
                    {notifications.some(n => n.chatId === conversations
                        .filter(c => c.senderId !== c.receiverId)
                        .find(c => (c.senderId === user?._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user?._id)
                        )?._id)
                    &&
                    (!currentChat || currentChat !== conversations
                    .filter(c => c.senderId !== c.receiverId)
                    .find(c => (c.senderId === user?._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user?._id))
                    ) &&
                    <img 
                    className="iconImg"
                    src={notificationIcon} 
                    alt=""
                    />
                    }
                </div>
            </div>
            )
            )
        :
        <p>No one is online</p>
        }
</>
)}

export default OnlineView