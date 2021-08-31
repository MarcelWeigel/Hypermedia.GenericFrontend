import moment from 'moment';

export default class MillisecondsToTimeStringConverter {
  static convert(ms: number): string {
    // todo solve dst problem
    // return moment(ms).format('HH:mm:ss');
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor(((ms % 360000) % 60000) / 1000);
    return `${MillisecondsToTimeStringConverter.pad(hours, 2)}:${MillisecondsToTimeStringConverter.pad(
      minutes,
      2,
    )}:${MillisecondsToTimeStringConverter.pad(seconds, 2)}`;
  }

  private static pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
}
