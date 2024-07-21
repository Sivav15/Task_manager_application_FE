const convertTo12HourFormatWithDate = (isoTimestamp) => {
  // Create a Date object from the ISO timestamp
  const date = new Date(isoTimestamp);

  // Extract date components
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Extract time components
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format minutes and seconds to be two digits
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;

  // Return the formatted date and time
  return `${day}/${month}/${year} ${hours}:${minutesFormatted}:${secondsFormatted} ${ampm}`;
};

export default convertTo12HourFormatWithDate;
