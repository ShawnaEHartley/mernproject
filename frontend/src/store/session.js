import jwtFetch from './jwt';
import { closeModal } from './modal';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER"; 
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS"; 
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";


const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER, 
    currentUser
});

const receiveSessionErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS, 
    errors
});

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

const logoutUser = () => {
    return {
        type: RECEIVE_USER_LOGOUT
    }
};


export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};


export const signup = (user) => startSession(user, 'api/users/register');
export const login = (user) => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: "POST", 
            body: JSON.stringify(userInfo)
        });
        const { user, token } = await res.json();
        localStorage.setItem('jwtToken', token);
        dispatch(closeModal());
        return dispatch(receiveCurrentUser(user));
    } catch(err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveSessionErrors(res.errors));
        }
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    return dispatch(logoutUser()); 
};


const nullErrors = {}; 

export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS: 
            return action.errors; 
        case RECEIVE_CURRENT_USER: 
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default: 
            return state;
    }
};


const initialState = {
    user: undefined
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { user: action.currentUser };
        case RECEIVE_USER_LOGOUT:
            // invoke a function here to set trips to {}
            return initialState; 
        default: 
            return state; 
    }
}


export default sessionReducer; 