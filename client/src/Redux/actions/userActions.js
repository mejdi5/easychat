import { Axios } from '../../Axios';
import {GET_USERS, GET_ONE_USER, FILTER, FILTER_USERS} from './ActionTypes'



//Get all users
export const getUsers = () => (dispatch) => {
    Axios
    .get(`/api/users/allUsers`)
    .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
    .catch((err) => console.log(err));
};

//Get one user
export const getOneUser = userId => (dispatch) => {
    Axios
    .get(`/api/users/user/${userId}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

//Delete a user
export const deleteUser = (idUser) => (dispatch) => {
    Axios
    .delete(`/api/users/delete/${idUser}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};

//Update a user
export const editUser = (id, editedUser) => (dispatch) => {
    Axios
    .put(`/api/users/update/${id}`, editedUser)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};


//Filter users 
export const filterUsers = payload => {
    return {
        type: FILTER_USERS,
        payload
    }
};
