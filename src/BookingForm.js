import { fetchAPI, submitAPI } from './api';
import { useNavigate } from "react-router-dom";

function BookingForm({ formData, setFormData, availableTimes, dispatch }) {

    //handles change in any fiels apart from Date by updating formData object
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    //handles any changes to the Date field 1. updates formData object with the Date 2. updates the availableTimes
    function handleDateChange(e) {
        const selectedDate = e.target.value;
        setFormData(prev => ({ ...prev, date: selectedDate }));

        //gets all the times for that date from fetchAPI
        const rawTimes = fetchAPI(new Date(selectedDate));

        //gets a list of current bookings for all dates from local storage
        const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

        //get a list of bookedTimes for the selectedDate from the local storage
        const bookedTimes = existingBookings
            .filter((b) => b.date === selectedDate)
            .map((b) => b.time);

        //filters out the bookedTimes from the full list of times for the selectedDate
        const filteredTimes = rawTimes.filter((time) => !bookedTimes.includes(time));

        //calls dispatch
        //calls update_times with current availableTimes and list of the new times that are available for the date
        //availableTimes will be updated with the filteredTimes list
        dispatch({ type: 'update_times', times: filteredTimes });
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
            console.log('✅ Reservation submitted!',formData);
            //save the booking in local storage
            saveBooking(formData);
            navigate("/bookingconfirmed");
        } else {
            console.error('❌ Submission failed');
        }
    };

    return (
        <>
            <h1 className="formh1">Book Now</h1>
            <form className="bookingform" onSubmit={handleSubmit}>

                <label htmlFor="res-date">Date</label>
                <input type="date" id="res-date" name="date" value={formData.date} onChange={handleDateChange} aria-required="true" />

                <label htmlFor="res-time">Time</label>
                <select id="res-time" name="time" value={formData.time} onChange={handleChange} aria-required="true" >
                    <option value="">-- Select a time --</option>
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>

                <label htmlFor="guests">Number of Guests</label>
                <input type="number" placeholder="2" min="1" max="10" id="guests" name="guests" value={formData.guests} onChange={handleChange} aria-required="true" />

                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} >
                    <option>None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>

                <input type="submit" value="Make Your reservation" aria-label="Submit reservation form" />
            </form>
        </>
    );
}
export default BookingForm;