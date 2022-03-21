import axios from 'axios';
import {GET_MESSAGES} from './ActionTypes'



export const getMessages = (conversationId) => (dispatch) => {
    conversationId !== undefined &&
    axios
    .get(`/api/messages/${conversationId}`)
    .then((res) => dispatch({ type: GET_MESSAGES, payload: res.data }))
    .catch((err) => console.log('error', err));
};

export const postMessage = (newMessage, conversationId) => (dispatch) => {
    if (newMessage.conversation !== undefined) {
    axios
    .post(`/api/messages`, newMessage)
    .then((res) => dispatch(getMessages(conversationId)))
    .catch((err) => console.log(err));
    }
};

export const deleteMessage = (idMessage, conversationId) => (dispatch) => {
    axios
    .delete(`/api/messages/delete/${idMessage}`)
    .then((res) => dispatch(getMessages(conversationId)))
    .catch((err) => console.log(err));
};