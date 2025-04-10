import { initializeTimes, updateTimes } from './AvailableTimes'; // adjust if App is in a subfolder

describe('initializeTimes', () => {
  test('returns the correct list of times', () => {
    expect(initializeTimes()).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
    ]);
  });
});

describe('updateTimes', () => {
  test('returns the same times regardless of date (for now)', () => {
    const fakeAction = { type: 'update_times', date: '2025-04-20' };
    const fakeState = ['17:00', '18:00'];
    const result = updateTimes(fakeState, fakeAction);

    expect(result).toEqual([
      '17:00',
      '18:00'
    ]);
  });
});
