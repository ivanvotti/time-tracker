function prefix(value) {
  return value < 10 ? `0${value}` : value;
}

/**
  Formats duration in seconds as 'hh:mm:ss'.

  Example:

  let seconds = 100;
  formatDuration(seconds); // => '00:01:40'
*/
export default function formatDuration(duration) {
  let hours = Math.floor(duration / 60 / 60);
  let minutes = Math.floor((duration - (hours * 60 * 60)) / 60);
  let seconds = Math.round(duration - (hours * 60 * 60) - (minutes * 60));

  return `${prefix(hours)}:${prefix(minutes)}:${prefix(seconds)}`;
}
