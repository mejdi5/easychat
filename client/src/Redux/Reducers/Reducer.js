import {
    USER_LOADING,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    GET_AUTH_USER,
    AUTH_ERRORS,
    GET_USERS,
    GET_ONE_USER,
    GET_CONVERSATIONS,
    GET_ONE_CONVERSATION,
    GET_MESSAGES, 
    GET_GROUP_CONVERSATIONS,
    FILTER_USERS
  } from '../actions/ActionTypes';
  
  const initialState = {
    token: localStorage.getItem('x-auth-token'), 
    users: [],  //all users    
    user: null, //authentificated user
    adminConversation: null,
    isAuth: false,
    isLoading: true,
    msg: null,
    conversations: [],
    messages: [],
    groupConversations: [],
    UserString: ''
  };
  
  const Reducer = (state = initialState, { type, payload }) => {
        
    switch (type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
        };
    
      case REGISTER_USER:
        localStorage.setItem('x-auth-token', payload.token);
        return {
          ...state,
          token: payload.token,
          msg: payload.msg,
          user: payload.result,
          isLoading: false,
          isAuth: true,
        };

      case LOGIN_USER:
        localStorage.setItem('x-auth-token', payload.token);
        return {
          ...state,
          token: payload.token,
          msg: payload.msg,
          user: payload.user,
          isLoading: false,
          isAuth: true,
        };

      case GET_AUTH_USER:
        return {
          ...state,
          isLoading: false,
          isAuth: true,
          ...payload,
        };
      
      case AUTH_ERRORS:
      case LOGOUT_USER:
        localStorage.removeItem('x-auth-token');
        return {
          ...state,
          token: null,
          isAuth: false,
          user: null,
          isLoading: false,
          adminConversation: null,
          conversations: [],
          groupConversations: [],
          messages: []
        };

        case GET_USERS:
        return {
        ...state,
        users: payload,
        isLoading: false,
        };

        case GET_ONE_USER:
        return {
        ...state,
        user: payload
        };

        case GET_CONVERSATIONS:
        return {
        ...state, 
        conversations: payload,
        isLoading: false,
        } 

        case GET_ONE_CONVERSATION:
        return {
        ...state,
        isLoading: false,
        adminConversation: payload
        }
        
        case GET_MESSAGES:
        return {
        ...state, 
        messages: payload,
        isLoading: false,
        }

        case GET_GROUP_CONVERSATIONS:
        return {
        ...state, 
        groupConversations: payload,
        isLoading: false,
        } 

        case FILTER_USERS:
        return {
          ...state, 
          UserString: payload,
          isLoading: false,
        }

      default:
        return state;
    }
  };
  
  export default Reducer;