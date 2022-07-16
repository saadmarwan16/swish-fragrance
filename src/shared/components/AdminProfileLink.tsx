import Link from "next/link";
import { FunctionComponent } from "react";
import Routes from "../constants/routes";

interface AdminProfileLinkProps {}

const AdminProfileLink: FunctionComponent<AdminProfileLinkProps> = () => {
  return (
    <Link href={Routes.PROFILE}>
      <a>
        <div className="gap-2 custom-flex-center !justify-start">
          <div className="avatar placeholder">
            <div className="w-12 rounded bg-primary text-primary-content">
              <span className="text-3xl font-medium">A</span>
            </div>
          </div>

          <div className="font-medium">
            <p className="text-lg text-base-content line-clamp-1">
              Abdul Rahman Sa-ad
            </p>
            <p className="text-sm italic text-primary line-clamp-1">
              @rahmansaad16
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminProfileLink;
