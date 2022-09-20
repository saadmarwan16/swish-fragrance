import Link from "next/link";
import { FunctionComponent } from "react";
import { useAuthContext } from "../../modules/auth/AuthContext";
import Routes from "../constants/routes";
import { BASE_URL } from "../constants/urls";
import Avatar from "./Avatar";

interface AdminProfileLinkProps {}

const AdminProfileLink: FunctionComponent<AdminProfileLinkProps> = () => {
  const { user } = useAuthContext();
  return (
    <Link href={Routes.PROFILE}>
      <a>
        <div className="gap-2 custom-flex-center !justify-start">
          <Avatar
            alt="Profile Image"
            url={
              user?.image?.url
                ? `${BASE_URL}${user.image.url}`
                : "/images/no_profile_image.webp"
            }
            width="w-12"
          />

          <div className="font-medium">
            <p className="text-lg text-base-content line-clamp-1">
              {user ? user.name : "User name here"}
            </p>
            <p className="text-sm italic text-primary line-clamp-1">
              {user ? `@${user.username}` : "Username here"}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AdminProfileLink;
