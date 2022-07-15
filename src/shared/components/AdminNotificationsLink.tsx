import Link from "next/link";
import { FunctionComponent } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Routes from "../constants/routes";

interface AdminNotificationsLinkProps {}

const AdminNotificationsLink: FunctionComponent<AdminNotificationsLinkProps> = () => {
  return (
    <Link href={Routes.NOTIFICATIONS}>
      <a role='button' className="border rounded-lg border-base-300 btn btn-square btn-outline">
        <div className="relative p-[6px] text-4xl">
          <IoIosNotificationsOutline />
          <div className="absolute badge badge-xs right-2 top-2 badge-secondary !text-base-content">
            3
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminNotificationsLink;
