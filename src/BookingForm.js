function BookingForm({formData, setFormData, availableTimes, dispatch}) {

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleDateChange(e) {
        const selectedDate = e.target.value;
        setFormData(prev => ({ ...prev, date: selectedDate }));
        dispatch({ type: 'update_times', date: selectedDate});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        //Can send data to API here if needed
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