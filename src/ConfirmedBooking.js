import React from 'react';
import { useLocation } from "react-router-dom";

function ConfirmedBooking() {
  const { state } = useLocation();
  const booking = state;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(booking.date));
  

  // ✅ Early return if no booking
  if (!booking) {
    return (
      <main className="bookingmain">
        <div className="bookingrow1">
          <h1>No booking found</h1>
          <p>Please make a reservation first.</p>
        </div>
      </main>
    );
  }

  // ✅ Return normal confirmation if booking exists
  return (
    <main className="bookingmain">
      <div className="bookingrow1">
        <h1>Thank you for your Booking at Little Lemon</h1>
        <p>We can't wait to see you at Little Lemon restaurant.</p>
        <p>Don't hesitate to call us on +1 435 343 2323 or email info@littlemon.com if you need to cancel or adjust your booking.</p>
        </div>
        <div className="bookingrow2">
          <h1>Booking Details</h1>
        <p className="bookingdetails"><b>Date:</b> {formattedDate}</p>
        <p className="bookingdetails"><b>Time:</b> {booking.time}</p>
        <p className="bookingdetails"><b>Guests:</b> {booking.guests}</p>
        <p className="bookingdetails"><b>Occasion:</b> {booking.occasion || 'None'}</p>
      </div>
    </main>
  );
}

export default ConfirmedBooking;
