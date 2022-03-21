import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../Redux/actions/userActions'
import { getConversations } from '../../Redux/actions/conversationActions'
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



function UsersManage({setToggle, userId, setUserId, setConversationId, setGroupConversationId}) {


    const dispatch = useDispatch()
    const users = useSelector((state) => state.users);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        setUserId('');
        setConversationId('');
        setGroupConversationId('')
    }, []);

    //delete user
    const removeUser = (id) => {
        dispatch(deleteUser(id));
        setModal(false) 
    }

    //set user private conversations
    const setUserConversations = (id) => {
        setUserId(id);
        dispatch(getConversations(userId));
        setToggle("conversations");
    }

    //set user group conversations
    const setUserGroupConversations = (id) => {
        setUserId(id);
        dispatch(getGroupConversations(userId));
        setToggle("groupConversations")
    }


return (
<>
    <h1 style={{color:'black', marginLeft:'40%'}}>Website Users</h1>
    <div className="grid-container">
    <div className="grid-item">
    {users && users
    .filter(u => !u.isAdmin)
    .map((u, index) =>
    <div style={{marginBottom:'20px'}} key={index}>
    <MDBRow>
    <MDBCol sm='12'>
        <MDBCard>
            <MDBCardBody>
            <MDBCardTitle>
                <img 
                className="conversationImg"
                src={u.picture?.path} 
                alt='' />
            </MDBCardTitle>
                <MDBCardTitle> {u.firstName} {u.lastName} </MDBCardTitle>
                <MDBCardTitle> {u.email} </MDBCardTitle>
                <MDBBtn onClick={() => setUserConversations(u._id)}>{`${u.firstName}'s conversations `}</MDBBtn>
                <MDBBtn onClick={() => setUserGroupConversations(u._id)}>{`${u.firstName}'s groups `}</MDBBtn>
                <MDBBtn onClick={() => setModal(true)}>{`Delete ${u.firstName}`}</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>
    </MDBRow> 


    <MDBModal show={modal} tabIndex='-1' setShow={setModal}>
    <MDBModalDialog size='sm'>
    <MDBModalContent>
        <MDBModalHeader>
        <MDBModalTitle>Delete {u.firstName} ?</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={() => setModal(!modal)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <MDBBtn onClick={() => removeUser(u._id)}>Delete</MDBBtn>
        </MDBModalBody>
    </MDBModalContent>
    </MDBModalDialog>
    </MDBModal>
    </div>
        )}
    </div>
</div>
</>
)}

export default UsersManage