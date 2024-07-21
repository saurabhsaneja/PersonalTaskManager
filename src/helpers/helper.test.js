// helpers.test.ts
import { getFont, isFuture } from './helper';
import moment from 'moment';

// Mock the moment function to control the current time
jest.mock('moment', () => {
  const actualMoment = jest.requireActual('moment');
  return (dateString) => {
    if (dateString) {
      return actualMoment(dateString);
    }
    return actualMoment('2024-07-21'); // Mock the current date
  };
});

describe('helpers', () => {
  describe('getFont', () => {
    it('returns the correct font string for a given type', () => {
      expect(getFont('Bold')).toBe('Roboto-Bold');
      expect(getFont('Italic')).toBe('Roboto-Italic');
      expect(getFont('Regular')).toBe('Roboto-Regular');
    });
  });

  describe('isFuture', () => {
    it('returns true for a future date', () => {
      expect(isFuture('2024-07-22')).toBe(true);
    });

    it('returns false for a past date', () => {
      expect(isFuture('2024-07-20')).toBe(false);
    });

    it('returns false for the current date', () => {
      expect(isFuture('2024-07-21')).toBe(false); // Assume today's date is mocked as '2024-07-21'
    });

    it('returns false for an invalid date', () => {
      expect(isFuture('invalid-date')).toBe(false);
    });
  });
});
