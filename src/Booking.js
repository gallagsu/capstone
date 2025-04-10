import BookingForm from "./BookingForm";
import BookingSlot from "./BookingSlot";
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
        <p>We can't wait to see you at Little Lemon restaurant. To make a booking...</p>
        <BookingSlot />
      </div>
      <div className="bookingrow2">
        <BookingForm
          formData={formData}
          setFormData={setFormData}
          availableTimes={availableTimes}
          dispatch={dispatch}
        />
      </div>
    </main>
  );
}

export default Booking;