export const getGreeting = () => {
  const currentHour = new Date().getHours(); // Get the current hour (0-23)

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

export const getFormattedDate = (): string => {
  const today = new Date();

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const day = today.getDate(); // Day of the month
  const month = months[today.getMonth()]; // Month name
  const year = today.getFullYear(); // Year

  return `${day} ${month} ${year}`;
};
