import { Axios } from '../../Axios';
import {GET_GROUP_CONVERSATIONS} from './ActionTypes'


//get group conversations of one user
export const getGroupConversations = (userId) => (dispatch) => {
    Axios
    .get(`/api/groupConversations/${userId}`)
    .then((res) => dispatch({ type: GET_GROUP_CONVERSATIONS, payload: res.data }))
    .catch((err) => console.log(err));
};

//post a new group conversation
export const postGroupConversation = (newGroupConversation, userId) => (dispatch) => {
    Axios
    .post(`/api/groupConversations`, newGroupConversation)
    .then((res) => dispatch(getGroupConversations(userId)))
    .catch((err) => console.log(err));
};

//delete a group conversation
export const deleteGroupConversation = (idConversation) => (dispatch) => {
    Axios
    .delete(`/api/groupConversations/delete/${idConversation}`)
    .then((res) => dispatch(getGroupConversations()))
    .catch((err) => console.log(err));
};