import jwtFetch from "./jwt";


const RECEIVE_TRIP = trips/RECEIVE_TRIP; 
const RECEIVE_TRIPS = trips/RECEIVE_TRIPS; 
const REMOVE_TRIP = trips/REMOVE_TRIP;
const RECEIVE_TRIP_ERRORS = trips/RECEIVE_TRIP_ERRORS;
const CLEAR_TRIP_ERRORS = trips/CLEAR_TRIP_ERRORS;


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

const clearTripErrors = (errors) => ({
    type: CLEAR_TRIP_ERRORS,
    errors 
});

export const fetchTrips = (userId) => async (dispatch) => {
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


export const createTrip = (data) = async (dispatch) => {
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

export const updateTrip = (trip) = async (dispatch) => {
    try {
        // const res = await jwtFetch(`/api/trips/`, {
            method: "PATCH", 
            body: JSON.stringify(trip)
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

export const addMemberToTrip = (tripId, userEmail) = async (dispatch) => {

}

export const removeMemberFromTrip = (tripId, memberId) => {

}

export const deleteTrip = (tripId) = async (dispatch) => {
    const res = await fetch(`/api/trips/${tripId}`, {
        method: "DELETE"
    })
    return dispatch(removeTrip(tripId));
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


const tripsReducer = (state = {}, action) => {
    let newState = { ...state }

    switch(action.type) {
        case RECEIVE_TRIP: 
            
        case RECEIVE_TRIPS: 
            return {...state, ...action.trips}
        case REMOVE_TRIP: 
            delete newState[action.trip.tripId]
            return newState 
        default: 
            return newState; 
    }
};

export default tripsReducer; 