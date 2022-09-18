import { Axios } from '../../Axios';
import {GET_MESSAGES} from './ActionTypes'


export const getMessages = (conversationId) => (dispatch) => {
    conversationId !== undefined &&
    Axios
    .get(`/api/messages/${conversationId}`)
    .then((res) => dispatch({ type: GET_MESSAGES, payload: res.data }))
    .catch((err) => console.log('error', err));
};

export const postMessage = (newMessage, conversationId) => (dispatch) => {
    if (newMessage.conversation !== undefined) {
    Axios
    .post(`/api/messages`, newMessage)
    .then((res) => dispatch(getMessages(conversationId)))
    .catch((err) => console.log(err));
    }
};

export const deleteMessage = (idMessage, conversationId) => (dispatch) => {
    Axios
    .delete(`/api/messages/delete/${idMessage}`)
    .then((res) => dispatch(getMessages(conversationId)))
    .catch((err) => console.log(err));
};