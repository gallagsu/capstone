import { fetchAPI, submitAPI } from './api';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

function BookingForm({ formData, setFormData, availableTimes, dispatch }) {

    //set up useState for error information
    const [errors, setErrors] = useState({});

    //handles change in any fields apart from Date by updating formData object
    function handleChange(e) {
        const { name, value } = e.target;

        if (name === 'guests') {
            if (value > 10 || value < 1) {
                setErrors(prev => ({ ...prev, guests: 'Maximum 10 guests allowed' }));
            } else {
                setErrors(prev => ({ ...prev, guests: '' }));
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    //handles any changes to the Date field 1. updates formData object with the Date 2. updates the availableTimes
    function handleDateChange(e) {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setErrors(prev => ({ ...prev, date: 'Please select today or a future date.' }));
        } else {
            setErrors(prev => ({ ...prev, date: '' }));

            setFormData(prev => ({ ...prev, date: e.target.value }));

            //gets all the times for that date from fetchAPI
            const rawTimes = fetchAPI(selectedDate);

            //gets a list of current bookings for all dates from local storage
            const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

            //get a list of bookedTimes for the selectedDate from the local storage
            const bookedTimes = existingBookings
                .filter((b) => b.date === e.target.value)
                .map((b) => b.time);

            //filters out the bookedTimes from the full list of times for the selectedDate
            const filteredTimes = rawTimes.filter((time) => !bookedTimes.includes(time));

            //calls dispatch
            //calls update_times with current availableTimes and list of the new times that are available for the date
            //availableTimes will be updated with the filteredTimes list
            dispatch({ type: 'update_times', times: filteredTimes });

        }
    }

    //adds each submitted formData object into the localStorage 'bookings' item
    function saveBooking(formData) {
        const existing = JSON.parse(localStorage.getItem('bookings')) || [];
        localStorage.setItem('bookings', JSON.stringify([...existing, formData]));
    }

    function isDoubleBooked(formData) {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

        //checks for an existing booking with same date/time as the current formData
        return bookings.some(
            (b) => b.date === formData.date && b.time === formData.time
        );
    }

    const navigate = useNavigate();

    //function to submit the form
    const handleSubmit = (e) => {
        e.preventDefault();

        //isDouleBooked returns true if that booking data/time is taken
        if (isDoubleBooked(formData)) {
            console.log('This time is already booked! Please choose another time.');
            return;
        }

        const success = submitAPI(formData);

        if (success) {
            console.log('✅ Reservation submitted!', formData);
            //save the booking in local storage
            saveBooking(formData);
            navigate("/bookingconfirmed");
        } else {
            console.error('❌ Submission failed');
        }
    };

    //check form data is valid before submitting
    function isFormValid(data) {
        return (
            data.date &&
            data.time &&
            data.guests >= 1 &&
            data.guests <= 10
        );
    }

    return (
        <>
            <h1 className="formh1">Book Now</h1>
            <form className="bookingform" onSubmit={handleSubmit}>

                <label htmlFor="res-date">Date</label>
                {errors.date && (
                    <span className="error">
                        {errors.date}
                    </span>
                )}
                <input type="date" id="res-date" name="date" value={formData.date} onChange={handleDateChange} aria-required="true" required className="openField" />

                <label htmlFor="res-time">Time</label>
                <select id="res-time" name="time" value={formData.time} onChange={handleChange} aria-required="true" required className="openField" >
                    <option value="">-- Select a time --</option>
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>

                <label htmlFor="guests">Number of Guests</label>
                {errors.guests && (
                    <span className="error">
                        {errors.guests}
                    </span>
                )}
                <input type="number" placeholder="2" min="1" max="10" id="guests" name="guests" value={formData.guests} onChange={handleChange} aria-required="true" required className="openField" />

                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} className="openField" >
                    <option>None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>

                <input
                    type="submit"
                    value="Make Your reservation"
                    aria-label="Submit reservation form"
                    disabled={!isFormValid(formData)}
                    className="openField"
                />
            </form>
        </>
    );
}
export default BookingForm;