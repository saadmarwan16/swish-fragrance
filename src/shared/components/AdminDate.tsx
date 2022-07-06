import { FunctionComponent } from "react";
import { AiOutlineCalendar } from "react-icons/ai";

interface AdminDateProps {}

const AdminDate: FunctionComponent<AdminDateProps> = () => {
  return (
    <div className="flex items-center gap-3 text-xl sm:text-2xl lg:text-xl xl:text-2xl">
      <AiOutlineCalendar />
      <p className="line-clamp-1">June 30, 2022</p>
    </div>
  );
};

export default AdminDate;