import Link from "next/link";
import { FunctionComponent } from "react";
import Routes from "../constants/routes";

interface AdminProfileLinkProps {}

const AdminProfileLink: FunctionComponent<AdminProfileLinkProps> = () => {
  return (
    <Link href={Routes.PROFILE}>
      <a>
        <div className="flex items-center gap-2">
          <div className="avatar placeholder">
            <div className="w-12 rounded bg-neutral-focus text-neutral-content">
              <span className="text-3xl font-medium">A</span>
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-black line-clamp-1">
              Abdul Rahman Sa-ad
            </p>
            <p className="text-sm italic text-blue-500 line-clamp-1">
              @rahmansaad16
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminProfileLink;
