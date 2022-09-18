import { Axios } from '../../Axios';
import {GET_CONVERSATIONS,  GET_ONE_CONVERSATION} from './ActionTypes'


//get conversations of one user
export const getConversations = (userId) => (dispatch) => {
    Axios
    .get(`/api/conversations/${userId}`)
    .then((res) => dispatch({ type: GET_CONVERSATIONS, payload: res.data }))
    .catch((err) => console.log(err));
};


//get one conversation
export const getOneConversation = (firstUserId, secondUserId) => (dispatch) => {
    Axios
    .get(`/api/conversations/${firstUserId}/${secondUserId}`)
    .then((res) => dispatch({ type: GET_ONE_CONVERSATION, payload: res.data }))
    .catch((err) => console.log(err));
};


export const postConversation = (newConversation, userId) => (dispatch) => {
    Axios
    .post(`/api/conversations`, newConversation)
    .then((res) => dispatch(getConversations(userId)))
    .catch((err) => console.log(err));
};


export const deleteConversation = (idConversation) => (dispatch) => {
    Axios
    .delete(`/api/conversations/delete/${idConversation}`)
    .then((res) => dispatch(getConversations()))
    .catch((err) => console.log(err));
};
