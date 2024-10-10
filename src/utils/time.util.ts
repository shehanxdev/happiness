export const getTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to ensure two digits
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Return the formatted time
  return `${hours}:${formattedMinutes} ${ampm}`;
};

export const getCurrentDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  console.log(`the get year gives  ${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};
