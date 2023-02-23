import jwtFetch from "./jwt";


const RECEIVE_TRIP = "trips/RECEIVE_TRIP"; 
const RECEIVE_TRIPS = "trips/RECEIVE_TRIPS"; 
const REMOVE_TRIP = "trips/REMOVE_TRIP";
const RECEIVE_TRIP_ERRORS = "trips/RECEIVE_TRIP_ERRORS";
const CLEAR_TRIP_ERRORS = "trips/CLEAR_TRIP_ERRORS";


const receiveTrip = (trip) => ({
    type: RECEIVE_TRIP, 
    trip 
});

const receiveTrips = (trips) => ({
    type: RECEIVE_TRIPS, 
    trips 
});

const removeTrip = (tripId) => ({
    type: REMOVE_TRIP, 
    tripId
});

const receiveTripErrors = (errors) => ({
    type: RECEIVE_TRIP_ERRORS,
    errors 
});

export const clearTripErrors = (errors) => ({
    type: CLEAR_TRIP_ERRORS,
    errors 
});


export const getTrips = (state) => {
    if (state.trips) {
        return Object.values(state.trips);
    } else {
        return null
    }
};

export const getTrip = (state) => {
    if (state.trips) {
        return state.trips
    } else {
        return null
    }
};

export const fetchAllTrips = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/trips/');
        const trips = await res.json();
        dispatch(receiveTrips(trips));
    } catch(err) {
        const resBody = await err.json(); 
        if (resBody.statusCode === 400) {
            dispatch(receiveTripErrors(resBody.errors))
        }
    }
};

export const fetchUserTrips = (userId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/trips/user/${userId}`);
        const trips = await res.json(); 
        dispatch(receiveTrips(trips));
    } catch (err) {
        const resBody = await err.json(); 
        if (resBody.statusCode === 400) {
            dispatch(receiveTripErrors(resBody.errors));
        }
    }
};

export const fetchTrip = (tripId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/trips/${tripId}`)
        const trip = await res.json();
        dispatch(receiveTrip(trip)); 
    } catch (err) {
        const resBody = await err.json(); 
        if (resBody.statusCode === 400 ) {
            dispatch(receiveTripErrors(resBody.errors))
        }
    }
};


export const createTrip = (data) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/trips/`, {
            method: "POST", 
            body: JSON.stringify(data)
        }); 
        const trip = await res.json(); 
        dispatch(receiveTrip(trip));
    } catch(err) {
        const resBody = await err.json(); 
        if (resBody.statusCode === 400) {
            return dispatch(receiveTripErrors(resBody.errors))
        }
    }
};

export const updateTrip = (tripObject, tripId) => async (dispatch) => {
    
    try {
        const res = await jwtFetch(`/api/trips/${tripId}`, {
            method: "PATCH", 
            body: JSON.stringify(tripObject)
        });
        
        const trip = await res.json(); 
        dispatch(receiveTrip(trip));
    } catch(err) {
        const resBody = await err.json(); 
        if (resBody.statusCode === 400) {
            return dispatch(receiveTripErrors(resBody.errors))
        }
    }
};


export const addUserToTrip = (tripId, userEmail) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/trips/addUser/${tripId}`, {
            method: "PATCH",
            body: JSON.stringify(userEmail)
        }); 
        const trip = await res.json(); 
        dispatch(receiveTrip(trip)); 
    } catch(err) {
        const resBody = await err.json(); 
        if (resBody.statusCode === 400) {
            return dispatch(receiveTripErrors(resBody.errors))
        }
    }
};


export const removeUserFromTrip = (tripId, memberId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/trips/${tripId}`, {
            method: "PATCH",
            body: JSON.stringify(memberId)
        })
        const trip = await res.json();
        dispatch(receiveTrip(trip));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveTripErrors(resBody.errors))
        }
    }
};


export const deleteTrip = (tripId) => async (dispatch) => {
    try {
        await jwtFetch(`/api/trips/${tripId}`, {
            method: 'DELETE'
        });
        
        return dispatch(removeTrip(tripId));
    } catch(err) {
        console.log(':(')
    }
};


const nullErrors = null; 

export const tripErrorsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_TRIP_ERRORS: 
            return action.errors; 
        case CLEAR_TRIP_ERRORS: 
            return nullErrors; 
        default: 
            return state; 
    }
};  


const TripsReducer = (state = {}, action) => {
    let newState = { ...state }

    switch(action.type) {
        case RECEIVE_TRIP:
            return {...state, ...action.trip }
        case RECEIVE_TRIPS: 
            return {...state, ...action.trips } 
        case REMOVE_TRIP:
            delete(newState[action.tripId])
            return newState 
        default: 
            return newState; 
    }
};

export default TripsReducer; 