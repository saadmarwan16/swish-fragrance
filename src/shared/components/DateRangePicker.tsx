import { FunctionComponent, useState } from "react";
import DatePicker, {
  DayRange,
  utils,
} from "@amir04lm26/react-modern-calendar-date-picker";
import getWeekBeforeDate from "../utils/getWeekBeforeDate";

interface DateRangePickerProps {}

const DateRangePicker: FunctionComponent<DateRangePickerProps> = () => {
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
          ? `${dayRange.from.year
              .toString()
              .padStart(2, "0")}-${dayRange.from.month
              .toString()
              .padStart(2, "0")}-${dayRange.from.day
              .toString()
              .padStart(2, "0")} to ${dayRange.to.year
              .toString()
              .padStart(2, "0")}-${dayRange.to.month
              .toString()
              .padStart(2, "0")}-${dayRange.to.day.toString().padStart(2, "0")}`
          : "Selecting..."
      }
      className="px-0 py-1 text-center border rounded-lg w-44 custom-subtitle1 border-base-300 sm:w-52"
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
      onChange={setDayRange}
      renderFooter={() => (
        <div
          className="hover:cursor-pointer text-primary"
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "1rem 2rem",
          }}
        >
          <button className="w-20 btn btn-primary btn-sm">Apply</button>
        </div>
      )}
    />
  );
};

export default DateRangePicker;
