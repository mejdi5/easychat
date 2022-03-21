import React,{useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Button} from 'reactstrap'
import PrivateChat from './PrivateChat';
import PublicChat from './PublicChat';
import {getMessages} from '../../Redux/actions/messageActions'
import { Link } from 'react-router-dom'
import './Chat.css'


function Chat({currentChat, socket, setManage, notifications, setNotifications}) {

    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const user = useSelector((state) => state.user);
    const messages = useSelector((state) => state.messages);

    //scroll to last message
    const scrollRef = useRef()
    useEffect(() => 
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    , [messages]);


    return (
    <>
        {currentChat?.senderId && currentChat?.receiverId 
        ? 

        <PrivateChat 
        socket={socket}
        currentChat={currentChat}
        text={text}
        setText={setText}
        setManage={setManage}
        scrollRef={scrollRef}
        notifications={notifications}
        setNotifications={setNotifications}
        />
        
        : currentChat?.members 
        ? 

        
        <PublicChat 
        socket={socket}
        currentChat={currentChat}
        text={text}
        setText={setText}
        setManage={setManage}
        scrollRef={scrollRef}
        />

        :

        <div className="chat" >
        <div className="chat_header">
            <div className="chat_headerinfo"></div>
            <div className="chat_headerRight">
                {user?.isAdmin &&
                <Link to="/manage">
                    <Button onClick={() => setManage(true)}>Manage</Button>
                </Link> 
                }
            </div>
        </div>
        <h2
        className="conversation_text display-1 opacity-50"
        >Start A New Conversation</h2>
        </div>
        }
    </>
    )
}

export default Chat
