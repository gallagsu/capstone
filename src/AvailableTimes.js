import { fetchAPI } from './api';

export const initializeTimes = () => {
  const today = new Date(); //default of today's date
  return fetchAPI(today); //calls fetchAPI to get times available for today
};

//action is an object with {type: x, times: x}
//state is the current value of availableTimes
//whatever is returned is set as availableTimes
export const updateTimes = ((state, action) => {
  if (action.type === 'update_times') {
    //if we're updating times, return the new times that were passed in
    return action.times;
  }
  //if we're not updating times, return the current availableTimes value instead
  return state;
});