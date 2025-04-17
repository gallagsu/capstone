import { fetchAPI, submitAPI } from './api';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

function BookingForm({ formData, setFormData, availableTimes, dispatch }) {

    //set up useState for error information and loading time and submitting time
    const [errors, setErrors] = useState({});
    const [loadingTimes, setLoadingTimes] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    //handles change in any fields apart from Date by updating formData object
    function handleChange(e) {
        const { name, value } = e.target;

        if (name === 'guests') {
            if (value > 10 || value < 1) {
                setErrors(prev => ({ ...prev, guests: 'Choose a table for 1-10 guests only.' }));
            } else {
                setErrors(prev => ({ ...prev, guests: '' }));
            }
        }

        if (name === 'time') {
            if (value == '') {
                setErrors(prev => ({ ...prev, time: 'Please select a time for your booking.' }));
            } else {
                setErrors(prev => ({ ...prev, time: '' }));
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Handles any changes to the date field
    // 1. updates formData object with the Date
    // 2. updates the availableTimes for the new Date
    function handleDateChange(e) {
        const selectedDateStr = e.target.value;
        const selectedDate = new Date(selectedDateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0); //get Today in the right format at time 0

        //can't choose a date in the past
        if (selectedDate < today) {
            setErrors(prev => ({ ...prev, date: 'Please select today or a future date.' }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            date: selectedDateStr
        }));

        setErrors(prev => ({ ...prev, date: '' }));
        setLoadingTimes(true); //Show loading state

        //Simulate async delay when using local api
        setTimeout(() => {
            const rawTimes = fetchAPI(selectedDate);
            const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

            const bookedTimes = existingBookings
                .filter(b => b.date === selectedDateStr)
                .map(b => b.time);

            //Filter out times already booked on that date
            const filteredTimes = rawTimes.filter(time => !bookedTimes.includes(time));

            //Check if the previously selected time is still valid
            const isTimeStillValid = filteredTimes.includes(formData.time);

            //Update formData: set date and possibly clear time
            setFormData(prev => ({
                ...prev,
                time: isTimeStillValid ? prev.time : ""
            }));

            //If time is no longer valid, show an error
            if (formData.time && !isTimeStillValid) {
                setErrors(prev => ({
                    ...prev,
                    time: 'Please select a new time for the updated date.'
                }));
            }

            //Update available times in state
            dispatch({ type: 'update_times', times: filteredTimes });
            setLoadingTimes(false); //Done loading
        }, 1000);
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

        //isDouleBooked check including console warning
        if (isDoubleBooked(formData)) {
            console.warn('Double booking prevented (should never happen).');
            return;
        }

        setSubmitting(true); //This starts loading

        //Simulate network delay
        setTimeout(() => {
            const success = submitAPI(formData);

            if (success) {
                console.log('✅ Reservation submitted!', formData);
                //save the booking in local storage
                saveBooking(formData);
                navigate("/bookingconfirmed", { state: formData });
            } else {
                console.error('❌ Submission failed');
            }

            setSubmitting(false); //Finished submitting
        }, 2000); //Simulate 2 second delay
    };

    //check form data is valid before submitting
    function isFormValid(data) {
        return (
            data.date &&
            data.time !== "" &&
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
                {errors.time && (
                    <span className="error">
                        {errors.time}
                    </span>
                )}
                {loadingTimes && <div className="spinner" role="status" aria-label="Loading available times" />}
                <select id="res-time" name="time" value={formData.time} onChange={handleChange} disabled={loadingTimes} aria-required="true" required className="openField" >
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

                <button
                    type="submit"
                    aria-label="Submit reservation form"
                    disabled={!isFormValid(formData) || submitting}
                    className="openField"
                >
                    {submitting ? <div className="spinner" role="status" aria-label="Submitting form" /> : " Make your Reservation"}
                </button>

            </form>
        </>
    );
}
export default BookingForm;