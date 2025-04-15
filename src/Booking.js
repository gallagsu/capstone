import BookingForm from "./BookingForm";
import React, { useState } from 'react';

function Booking({ availableTimes, dispatch }) {

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    occassion: 'None',
  });

  return (
    <main class="bookingmain">
      <div className="bookingrow1">
        <h1>Book a Table at Little Lemon</h1>
        <p>We can't wait to see you at Little Lemon restaurant.</p>
      </div>
      <div className="bookingrow2">
        <BookingForm
          formData={formData} //form data for initial form render
          setFormData={setFormData} //function to update the form data
          availableTimes={availableTimes} //the  initial available times
          dispatch={dispatch} //function to call update_times(availableTimes, action)
        />
      </div>
    </main>
  );
}

export default Booking;