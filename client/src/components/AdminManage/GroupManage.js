import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroupConversation } from '../../Redux/actions/groupConversationActions'
import { getMessages } from '../../Redux/actions/messageActions'
import { getGroupConversations } from '../../Redux/actions/groupConversationActions'
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



function GroupManage({setToggle, userId, groupConversationId, setGroupConversationId, setConversationId}) {


    const dispatch = useDispatch()
    const [membersView, setMembersView] = useState(false);
    const [openingGroupModal, setOpeningGroupModal] = useState(false)
    const users = useSelector((state) => state.users);
    const groupConversations = useSelector((state) => state.groupConversations);


    useEffect(() =>
        dispatch(getGroupConversations(userId))
    , []);

    useEffect(() => {
        setConversationId('');
        setGroupConversationId('')
    }, []);


    //delete group conversation
    const removeGroupConversation = (ID) => {
        dispatch(deleteGroupConversation(ID))
        setOpeningGroupModal(false)
    }

    //set messages of a group conversation
    const setGroupConversationMessages= (Id) => {
        setGroupConversationId(Id);
        setConversationId('');
        setToggle("messages");
    }


return (
    <>
        <img src={users.find(u => u._id === userId).picture.path} 
        alt="" 
        className="conversationImg" 
        style={{float:'right'}}
        />
        <h1 style={{color:'black', marginLeft:'40%'}}>{`${users.find(u => u._id === userId).firstName} Group Conversations `}</h1>
        <p className="manage"
        onClick={() => setToggle("users")}
        >back to users</p>
        <p className="manage"
        onClick={() => setToggle("conversations")}
        >{`${users.find(u => u._id === userId).firstName} private conversations `}</p>
        {groupConversations.length > 0
        ?
        <div className="grid-container">
            <div className="grid-item">
            {groupConversations && groupConversations
            .map((groupConversation,index) => {
            return (
                <div style={{marginBottom:'20px'}} key={index}>
                <MDBRow>
                <MDBCol sm='12'>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle> Group {index + 1} </MDBCardTitle>
                        <MDBBtn onClick={() => setMembersView(true)}>See Members</MDBBtn>

                            <MDBModal show={membersView} tabIndex='-1' setShow={setMembersView}>
                                <MDBModalDialog size='sm'>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle                     
                                        style={{marginLeft:'35%', marginTop:'10px'}}
                                        >Members</MDBModalTitle>
                                        <MDBBtn className='btn-close' color='none' onClick={() => setMembersView(false)}></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        {users
                                        .filter(u => groupConversation.members.includes(u._id))
                                        .map((u,i) => 
                                        <div style={{textAlign:'center'}} key={i}>
                                            <img src={u.picture.path} alt="" className="conversationImg"/>
                                            <p> {u.firstName} {u.lastName} </p>
                                        </div>
                                        )}
                                    </MDBModalBody>
                                </MDBModalContent>
                                </MDBModalDialog>
                            </MDBModal>

                            <MDBBtn onClick={() => setGroupConversationMessages(groupConversation._id)}>See Messages</MDBBtn>
                            <MDBBtn onClick={() => setOpeningGroupModal(true)}>Delete</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow> 
        
            <MDBModal show={openingGroupModal} tabIndex='-1' setShow={setOpeningGroupModal}>
            <MDBModalDialog size='sm'>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Delete this group ?</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setOpeningGroupModal(!openingGroupModal)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                <MDBBtn onClick={() => removeGroupConversation(groupConversation._id)}>Delete</MDBBtn>
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
        :
        <p style={{marginLeft:'40%', color:'white'}}>{`${users.find(u => u._id === userId).firstName} has no group conversations `}</p>
        }
        </>   
)}

export default GroupManage