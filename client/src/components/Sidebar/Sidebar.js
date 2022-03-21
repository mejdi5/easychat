import React,{useState} from 'react'
import GroupConversation from './GroupConversation';
import SideBarHeader from './SideBarHeader';
import OnlineView from './sidebarPrivateConversation/OnlineView';
import AllView from './sidebarPrivateConversation/AllView';
import './Sidebar.css'


function Sidebar({currentChat, setCurrentChat, onlineUsers, notifications, setNotifications, publicNotifications, setPublicNotifications}) {

    const [onlineView, setOnlineView] = useState(true)

    const readingConversation = (conversation) => {
        setCurrentChat(conversation);
        setNotifications(notifications.filter(n => n.chatId === currentChat?._id))
    }

    const readingPublicConversation = (conversation) => {
        setCurrentChat(conversation);
        setPublicNotifications(publicNotifications.filter(n => n.chatId === currentChat?._id))
    }


return (
<div className="sidebar">
    
    <SideBarHeader/>

    <div className="sidebar-chats">
        {!onlineView 
        ?
        <AllView 
        readingConversation={readingConversation}
        notifications={notifications}
        setNotifications={setNotifications}
        setOnlineView={setOnlineView}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        />
        : 
        <OnlineView 
        onlineUsers={onlineUsers}
        readingConversation={readingConversation}
        notifications={notifications}
        setNotifications={setNotifications}
        setOnlineView={setOnlineView}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        />
        }
    </div>

    <GroupConversation
    currentChat={currentChat}
    setCurrentChat={setCurrentChat}
    readingPublicConversation={readingPublicConversation}
    publicNotifications={publicNotifications}
    setPublicNotifications={setPublicNotifications}
    />

</div>
)}

export default Sidebar
