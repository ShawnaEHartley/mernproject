import jwtFetch from './jwt';

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

const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS, 
});

const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});


export const signup = (user) => startSession(user, 'api/login');
export const login = (user) => startSession(user, 'api/signup');

const startSession = (userInfo, route) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: "POST", 
            body: JSON.stringify(userInfo)
        });
        const { user, token } = await res.json();
        localStorage.setItem('jwtToken', token);
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
    dispatch(logoutUser()); 
};


const initialState = {
    user: undefined
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { user: action.currentUser };
        case RECEIVE_USER_LOGOUT: 
            return initialState; 
        default: 
            return state; 
    }
}


export default sessionReducer; 