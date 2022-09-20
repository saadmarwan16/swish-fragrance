import Link from "next/link";
import { FunctionComponent } from "react";
import { useAuthContext } from "../../modules/auth/AuthContext";
import Routes from "../constants/routes";
import LogoAvatar from "./LogoAvatar";

interface AdminDashboardLinkProps {}

const AdminDashboardLink: FunctionComponent<AdminDashboardLinkProps> = () => {
  const {user} = useAuthContext()
  return (
    <Link href={Routes.ADMIN_DASHBOARD}>
      <a className="hidden lg:block">
        <div className="gap-2 custom-flex-center !justify-start">
          <LogoAvatar />
          <div>
            <p className="custom-heading2 text-base-content">Swish Fragrance</p>
            <p className="font-normal custom-subtitle1">{user?.role?.name ?? 'Unknown Role'}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminDashboardLink;
