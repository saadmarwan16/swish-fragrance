import { FunctionComponent, useState } from "react";
import DatePicker, {
  DayRange,
  utils,
} from "@amir04lm26/react-modern-calendar-date-picker";
import getWeekBeforeDate from "../utils/getWeekBeforeDate";
import { getPaddedDate } from "../utils/getFormattedDate";

interface DateRangePickerProps {
  onChange: (value: DayRange) => void;
}

const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  onChange,
}) => {
  const { getToday } = utils("en");
  const [dayRange, setDayRange] = useState<DayRange>({
    from: getWeekBeforeDate(),
    to: getToday(),
  });

  const renderCustomInput = ({ ref }: { ref: any }) => (
    <input
      readOnly
      ref={ref}
      placeholder="Select date range"
      value={
        dayRange && dayRange.from && dayRange.to
          ? `${dayRange.from.year}-${getPaddedDate(
              dayRange.from.month
            )}-${getPaddedDate(dayRange.from.day)} to ${
              dayRange.to.year
            }-${getPaddedDate(dayRange.to.month)}-${getPaddedDate(
              dayRange.to.day
            )}`
          : "Selecting..."
      }
      className="py-1 text-center border rounded-lg w-44 custom-subtitle1 border-base-300 sm:w-52 hover:cursor-pointer sm:py-2"
    />
  );

  return (
    <DatePicker
      value={dayRange}
      calendarClassName="responsive-calendar"
      colorPrimary="#59C3C3"
      colorPrimaryLight="#59C3C333"
      renderInput={renderCustomInput}
      maximumDate={getToday()}
      onChange={(value) => {
        setDayRange(value);
        onChange(value);
      }}
    />
  );
};

export default DateRangePicker;
