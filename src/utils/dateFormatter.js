export const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  return `${day}/${month}/${year} ${hours}:${minutes}${amPm}`;
};
