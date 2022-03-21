import React,{ useState } from 'react'
import { useSelector } from 'react-redux';
import UsersManage from './UsersManage';
import ConversationsManage from './ConversationsManage';
import GroupManage from './GroupManage';
import MessagesManage from './MessagesManage';
import {Button} from 'reactstrap'
import noAvatar from '../../images/noAvatar.png'
import { Link } from 'react-router-dom'
import './Manage.css'

function Manage({setManage}) {

    const user = useSelector((state) => state.user);
    const [toggle, setToggle] = useState("users")
    const [userId, setUserId] = useState('')
    const [conversationId, setConversationId] = useState('')
    const [groupConversationId, setGroupConversationId] = useState('')

    console.log('ConversationId', conversationId)
    console.log('userId', userId)
    console.log('groupConversationId', groupConversationId)


    return (

    <div style={{backgroundColor:'grey'}}>

        <img
        className="conversationImg"
        style={{float:'left'}}
        src={user?.picture && user.picture !== null
            ? user.picture.path
            : noAvatar
            }
        crossOrigin='anonymous'
        alt=""
        />
        <Link to={`/${user._id}`}>
        <Button 
        onClick={() => setManage(false)}
        style={{float:'left'}}
        >Back to Chat</Button>
        </Link>

        {toggle === "users" 
        ?
        <UsersManage
        setToggle={setToggle}
        userId={userId}
        setUserId={setUserId}
        setConversationId={setConversationId}
        setGroupConversationId={setGroupConversationId}
        />
        : toggle === "conversations" 
        ?
        <ConversationsManage 
        setToggle={setToggle}
        userId={userId}
        conversationId={conversationId}
        setConversationId={setConversationId}
        setGroupConversationId={setGroupConversationId}
        />
        : toggle === "groupConversations"
        ?
        <GroupManage setToggle={setToggle}
        userId={userId}
        groupConversationId={groupConversationId}
        setGroupConversationId={setGroupConversationId}
        setConversationId={setConversationId}
        />
        : toggle === "messages"
        ?
        <MessagesManage
        setToggle={setToggle}
        userId={userId}
        conversationId={conversationId}
        setConversationId={setConversationId}
        groupConversationId={groupConversationId}
        setGroupConversationId={setGroupConversationId}
        />
        : null
        }
        
    </div>
    )
}


export default Manage;
