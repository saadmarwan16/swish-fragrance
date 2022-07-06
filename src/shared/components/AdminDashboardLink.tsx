import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
import Routes from "../constants/routes";

interface AdminDashboardLinkProps {}

const AdminDashboardLink: FunctionComponent<AdminDashboardLinkProps> = () => {
  return (
    <Link href={Routes.ADMIN_DASHBOARD}>
      <a className="hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-16 bg-transparent border border-gray-400 rounded text-neutral-content">
              <Image src="/images/logo.png" layout="fill" alt="Logo" />
            </div>
          </div>
          <div className="">
            <p className="text-2xl font-semibold text-black">Swish Fragrance</p>
            <p className="text-sm font-normal">Master Admin</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminDashboardLink;
