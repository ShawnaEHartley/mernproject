import React from 'react';
import { useHistory } from 'react-router-dom';
import TripShowPage from '../TripShowPage/TripShowPage';
import './TripIndex.css';


const TripIndexItem = ({trip, awsUrl}) => {
    const history = useHistory();

    if (!trip.title) {
        return <div></div>
    }

    const goToTripShow = (e) => {
        // if (typeof window !== 'undefined') {
        //     window.location.href = `/trips/${trip._id}`;
        // }
        history.push(`/trips/${trip._id}`);
    }

    const eventHost = () => {
        return trip.organizer.name;
    }

    const date = () => {
        const newDate = new Date(trip.startDate)
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        const day = newDate.getDate();
        return (
            `${month}-${day}-${year}`
        )
    }

    return (
        <>
            <div className='stamp-image-container' onClick={goToTripShow}>
                <div className='trip-info'>
                    <p id="trip-info-title">{trip.title}</p>
                    <p>{date()}</p>

                    {/* Can't render if line below is included, */}

                    {/* <p>Hosted by {trip.organizer.name}</p> */}
                </div>
                <div className='stamp-divider' />
                <div className='stamp-image-wrapper'>
                    <img className='stamp-image' src={awsUrl} alt='stamp' />
                </div>
            </div>
        </>
    )

}

export default TripIndexItem;