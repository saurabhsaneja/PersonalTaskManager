// getFont.test.js
import { getFont } from './helper';

describe('getFont', () => {
  it('returns the correct font string for a given type', () => {
    expect(getFont('Bold')).toBe('Roboto-Bold');
    expect(getFont('Italic')).toBe('Roboto-Italic');
    expect(getFont('Regular')).toBe('Roboto-Regular');
  });

  it('returns the correct font string for an empty type', () => {
    expect(getFont('')).toBe('Roboto-');
  });

  it('returns the correct font string for a type with spaces', () => {
    expect(getFont(' Bold')).toBe('Roboto- Bold');
    expect(getFont('Italic ')).toBe('Roboto-Italic ');
  });
});
