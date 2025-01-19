// utils/dateUtils.js

export const formatDate = (dateInput) => {
  // Convert dateInput to Date object if it's in ISO format
  const date = new Date(dateInput);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  // Define options for formatting
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // to get AM/PM
  };

  // Format the date to the desired format
  const formattedDate = date.toLocaleString("en-US", options);

  // Split the formatted date into parts and adjust the format
  const [month, day, year, time, ampm] = formattedDate.split(/[\s,]+/);
  // return `${month}. ${day}, ${year} ${time} ${ampm.toLowerCase()}`;
  return `${month}. ${day}, ${year} `;
};
