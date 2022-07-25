import dayjs from "dayjs";

const getWeekBeforeDate = () => {
  const date = dayjs().subtract(7, "day");

  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  return { year, month,  day};
};

export default getWeekBeforeDate;
