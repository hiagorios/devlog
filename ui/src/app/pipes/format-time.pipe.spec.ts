import { FormatTimePipe } from './format-time.pipe';

describe('FormatTimePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('return seconds only', () => {
    const pipe = new FormatTimePipe();
    expect(pipe.transform(59)).toBe('59s');
  });

  it('return minutes only', () => {
    const pipe = new FormatTimePipe();
    expect(pipe.transform(2 * 60)).toBe('2m');
  });

  it('return hours only', () => {
    const pipe = new FormatTimePipe();
    expect(pipe.transform(3 * 60 * 60)).toBe('3h');
  });

  it('return all', () => {
    const pipe = new FormatTimePipe();
    const hours = 60 * 60;
    const minutes = 30 * 60;
    const seconds = 40;
    expect(pipe.transform(hours + minutes + seconds)).toBe('1h 30m 40s');
  });
});
