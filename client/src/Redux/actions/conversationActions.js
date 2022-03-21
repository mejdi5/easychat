import axios from 'axios';
import {GET_CONVERSATIONS,  GET_ONE_CONVERSATION} from './ActionTypes'


//get conversations of one user
export const getConversations = (userId) => (dispatch) => {
    axios
    .get(`/api/conversations/${userId}`)
    .then((res) => dispatch({ type: GET_CONVERSATIONS, payload: res.data }))
    .catch((err) => console.log(err));
};


//get one conversation
export const getOneConversation = (firstUserId, secondUserId) => (dispatch) => {
    axios
    .get(`/api/conversations/${firstUserId}/${secondUserId}`)
    .then((res) => dispatch({ type: GET_ONE_CONVERSATION, payload: res.data }))
    .catch((err) => console.log(err));
};


export const postConversation = (newConversation, userId) => (dispatch) => {
    axios
    .post(`/api/conversations`, newConversation)
    .then((res) => dispatch(getConversations(userId)))
    .catch((err) => console.log(err));
};


export const deleteConversation = (idConversation) => (dispatch) => {
    axios
    .delete(`/api/conversations/delete/${idConversation}`)
    .then((res) => dispatch(getConversations()))
    .catch((err) => console.log(err));
};
