import React from "react";
import { formatDate } from "../utils/formatDate";

export default function FormattedDate({ date }) {
  let formattedDate;

  try {
    // Ensure the date is a Date object
    const dateTimeObject = new Date(date);

    // Format the date using the utility function
    formattedDate = formatDate(dateTimeObject);
  } catch (error) {
    // If the date is invalid, we can display an error message
    formattedDate = "Invalid Date";
  }

  return <span>{formattedDate}</span>;
}
