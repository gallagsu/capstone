export const initializeTimes = () => {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
  };
  
  export const updateTimes = ((state, action) => {
    //For now return the same list regardless of date
    //It will change depending on action.date later
    const selectedDate = action.date;
    console.log("Date selected:", selectedDate);
    console.log("State:", state);
  
    //later we'll return a specific list of times, so there won't be duplication
    return state;
  });