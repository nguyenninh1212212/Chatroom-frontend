export const formatDate = (text?: string) => {
  if (!text) return;
  const [date, time] = text.split("T");
  const [hour, minute] = time.split(":");
  let h = Number(hour);
  const period = h >= 12 ? "PM" : "AM";
  h = h > 12 ? h % 12 : h;
  const HourFormat12 = `${h}:${minute} ${period}`;
  const [yy, mm, dd] = date.split("-");
  const DateFormat = `${dd}/${mm}/${yy}`;

  return { HourFormat12, DateFormat };
};
