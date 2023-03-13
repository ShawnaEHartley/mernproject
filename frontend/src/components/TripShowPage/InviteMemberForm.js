import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addUserToTrip, fetchTrip, tripErrorsReducer, getTrip, clearTripErrors } from '../../store/trips';

import './InviteMemberForm.css';

const InviteMemberForm = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const trip = useSelector(getTrip)
  const errors = useSelector(state => state.errors.tripErrorsReducer);
  const [inviteeEmail, setInviteeEmail] = useState("");


  useEffect(() => {
    dispatch(fetchTrip(tripId));
  }, [dispatch, tripId])

  if (!trip.title) {
    return <div></div>
  }

  // search member by email
  const inviteMember = (e) => {
    e.preventDefault();

    //invite a member to this trip via their email via modal
    dispatch(addUserToTrip(tripId, inviteeEmail))
  };

  return (
    <form id='invite-trip-member-form' action="">
      <div className="errors">{errors?.email}</div>
      <div className="errors">{errors?.members}</div>
      <div>Enter their email</div>
      <input type="text" value= {inviteeEmail} onChange={e => {
        e.preventDefault();
        setInviteeEmail(e.target.value);
      }} />
      <button onClick={inviteMember}>Invite</button>
    </form>
  )
};

export default InviteMemberForm;