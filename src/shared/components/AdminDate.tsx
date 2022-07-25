import { FunctionComponent } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import getFormattedDate from "../utils/getFormattedDate";

interface AdminDateProps {}

const AdminDate: FunctionComponent<AdminDateProps> = () => {
  return (
    <div className="!justify-start gap-3 text-xl custom-flex-center sm:text-2xl lg:text-xl xl:text-2xl">
      <AiOutlineCalendar />
      <p className="line-clamp-1">{getFormattedDate(Date())}</p>
    </div>
  );
};

export default AdminDate;
