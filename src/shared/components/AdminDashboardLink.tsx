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
        <div className="gap-2 custom-flex-center !justify-start">
          <LogoAvatar />
          <div>
            <p className="custom-heading2 text-base-content">Swish Fragrance</p>
            <p className="font-normal custom-subtitle1">Master Admin</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminDashboardLink;
