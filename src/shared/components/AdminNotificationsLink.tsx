import Link from "next/link";
import { FunctionComponent } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Routes from "../constants/routes";

interface AdminNotificationsLinkProps {}

const AdminNotificationsLink: FunctionComponent<
  AdminNotificationsLinkProps
> = () => {
  return (
    <Link href={Routes.NOTIFICATIONS}>
      <a
        role="button"
        className="border rounded-lg border-base-300 btn btn-square btn-outline"
      >
        <div className="relative p-[6px] text-4xl">
          <IoIosNotificationsOutline />
          <span className="absolute badge badge-xs h-[8px] px-[3px] right-3 top-2 badge-secondary !text-base-content"></span>
        </div>
      </a>
    </Link>
  );
};

export default AdminNotificationsLink;
