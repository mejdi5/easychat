import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteConversation} from '../../Redux/actions/conversationActions'
import { getMessages } from '../../Redux/actions/messageActions'
import { getConversations } from '../../Redux/actions/conversationActions'
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBCard, 
    MDBCardBody, 
    MDBCardTitle, 
    MDBRow, 
    MDBCol, 
} from 'mdb-react-ui-kit';


function ConversationsManage({setToggle, userId, conversationId, setConversationId, setGroupConversationId}) {


    const dispatch = useDispatch();
    const users = useSelector((state) => state.users)
    const user = useSelector((state) => state.user)
    const conversations = useSelector((state) => state.conversations)
    const [openingModal, setOpeningModal] = useState(false)


    //get all private conversations 
    useEffect(() =>
        dispatch(getConversations(userId))
    , [userId]);

    useEffect(() => {
        setConversationId('');
        setGroupConversationId('')
    }, []);


    //delete private conversation
    const removeConversation = (ID) => {
        dispatch(deleteConversation(ID))
        setOpeningModal(false)
    }

    //set messages of a private conversation
    const setConversationMessages= (Id) => {
        setConversationId(Id);
        setGroupConversationId('');
        setToggle("messages")
    }



return (
    <>  
        <img src={users.find(u => u._id === userId).picture.path} 
        alt="" 
        className="conversationImg" 
        style={{float:'right'}}
        />
        <h1 style={{color:'black', marginLeft:'40%'}}>{`${users.find(u => u._id === userId).firstName} Private Conversations `}</h1>

        <p className="manage"
        onClick={() => setToggle("users")}
        >back to users</p>
        <p className="manage"
        onClick={() => setToggle("groupConversations")}
        >{`${users.find(u => u._id === userId).firstName} group conversations `}</p>

        <div className="grid-container">
            <div className="grid-item">
            {conversations && conversations
            .filter(conversation =>  conversation.senderId !== user._id && conversation.receiverId !== user._id)
            .map((conversation,index) => {
                const otherUser = users.find(u => u._id !== userId && (u._id === conversation.senderId || u._id === conversation.receiverId))
            return (
                <div style={{marginBottom:'20px'}} key={index}>
                <MDBRow>
                <MDBCol sm='12'>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle> Conversation {index + 1} </MDBCardTitle>
                        {otherUser 
                        ? <MDBCardTitle> {otherUser.firstName} {otherUser.lastName} </MDBCardTitle>
                        : <MDBCardTitle> {users.find(u => u._id === userId).firstName} {users.find(u => u._id === userId).lastName} </MDBCardTitle>
                        }
                            <MDBBtn onClick={() => setConversationMessages(conversation._id)}>See Messages</MDBBtn>
                            <MDBBtn onClick={() => setOpeningModal(true)}>Delete</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow> 
        
            <MDBModal show={openingModal} tabIndex='-1' setShow={setOpeningModal}>
            <MDBModalDialog size='sm'>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Delete this conversation ?</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setOpeningModal(!openingModal)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                <MDBBtn onClick={() => removeConversation(conversation._id)}>Delete</MDBBtn>
                </MDBModalBody>
            </MDBModalContent>
            </MDBModalDialog>
            </MDBModal>
                </div>
            )}
            )
            }
            </div>
        </div>
        </>   
)}

export default ConversationsManage