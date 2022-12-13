const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (input?: string) => {
  if (!input) return null;
  const date = new Date(input);
  const month = date.getMonth();
  return `${months[month]} ${date.getDate()}, ${date.getFullYear()}`;
};
