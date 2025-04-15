import { initializeTimes, updateTimes } from './AvailableTimes';
import * as api from './api';

describe('initializeTimes returns times from fetchAPI', () => {
  test('returns the correct list of times', () => {
    jest.spyOn(api, 'fetchAPI').mockReturnValue(['18:00', '19:30']);

    const times = initializeTimes();
    expect(times).toEqual(['18:00', '19:30']);

    // Clean up mock after test
    api.fetchAPI.mockRestore();
  });
});

describe('updateTimes', () => {
  test('updates the list of times', () => {
    const fakeAction = { type: 'update_times', times: ['17:00', '18:00'] };
    const fakeState = ['17:00', '19:00'];
    const result = updateTimes(fakeState, fakeAction);

    expect(result).toEqual([
      '17:00',
      '18:00'
    ]);
  });
});
