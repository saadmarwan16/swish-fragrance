import Link from "next/link";
import { FunctionComponent } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import Routes from "../constants/routes";
import useCustomBreakPointContext from "../hooks/useCustomBreakPoint";
import AdminDate from "./AdminDate";
import AdminNotificationsLink from "./AdminNotificationsLink";
import AdminProfileLink from "./AdminProfileLink";

interface AdminHeaderProps {}

const AdminHeader: FunctionComponent<AdminHeaderProps> = () => {
  const { minWidth } = useCustomBreakPointContext();

  return (
    <div className="custom-flex-center !justify-between">
      <div className="flex gap-4">
        <label
          htmlFor="my-drawer"
          className="px-0 py-0 lg:hidden btn btn-primary drawer-button w-[48px] rounded-lg"
        >
          <GiHamburgerMenu className="text-4xl" />
        </label>

        {!!minWidth && minWidth >= 640 && <AdminDate />}
      </div>

      <div className="flex sm:gap-2 xl:gap-4">
        <AdminNotificationsLink />

        <div className="hidden lg:block dropdown">
          <label
            tabIndex={0}
            className="custom-flex-center btn btn-outline gap-4 px-2 py-[10px] text-xl border border-base-300"
          >
            <div className="flex items-center">
              <AiOutlinePlus />
              <p className="text-lg font-medium">New</p>
            </div>
            <BsChevronDown className="text-sm" />
          </label>
          <ul
            tabIndex={0}
            className="p-2 text-base bg-gray-100 shadow dropdown-content menu rounded-box w-52"
          >
            <li>
              <Link href={Routes.NEW_PRODUCT}>
                <a>New Product</a>
              </Link>
            </li>
            <li>
              <Link href={Routes.NEW_CATEGORY}>
                <a>New Category</a>
              </Link>
            </li>
            <li>
              <Link href={Routes.NEW_BRAND}>
                <a>New Brand</a>
              </Link>
            </li>
          </ul>
        </div>

        {!!minWidth && minWidth >= 1024 && <AdminProfileLink />}
      </div>
    </div>
  );
};

export default AdminHeader;
