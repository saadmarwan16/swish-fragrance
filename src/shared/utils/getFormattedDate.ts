import { DayValue } from "@amir04lm26/react-modern-calendar-date-picker";
import dayjs from "dayjs";

const getFormattedDate = (date: Date | string) => {
  return dayjs(date).format("DD MMM, YYYY");
};

export const getDayjsDateObject = (date: Date) => {
  return dayjs(date);
};

export const getFormattedQueryDate = (date: DayValue) => {
  return `${date?.year}-${getPaddedDate(date!.month)}-${getPaddedDate(
    date!.day
  )}`;
};

export const getPaddedDate = (dateNumber: number) => {
  return dateNumber.toString().padStart(2, "0");
};

export const formatDateYearMonthDay = (date: Date) => {
  return dayjs(date).format("YYYY MMM DD");
};

export default getFormattedDate;
