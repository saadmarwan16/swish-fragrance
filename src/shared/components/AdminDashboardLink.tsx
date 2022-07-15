import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
import Routes from "../constants/routes";
import LogoAvatar from "./LogoAvatar";

interface AdminDashboardLinkProps {}

const AdminDashboardLink: FunctionComponent<AdminDashboardLinkProps> = () => {
  return (
    <Link href={Routes.ADMIN_DASHBOARD}>
      <a className="hidden lg:block">
        <div className="flex items-center gap-2">
          <LogoAvatar />
          <div>
            <p className="text-2xl font-semibold text-base-content">Swish Fragrance</p>
            <p className="text-sm font-normal text-gray-500">Master Admin</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminDashboardLink;
