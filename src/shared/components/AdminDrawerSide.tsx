import { FunctionComponent } from "react";
import AdminDashboardLink from "./AdminDashboardLink";
import AdminNewProductAndCategoryLinks from "./AdminNewProductAndCategoryLinks";
import AdminProfileLink from "./AdminProfileLink";
import AdminSideBarItems from "./AdminSideBarItems";
import { HiOutlineLogout } from "react-icons/hi";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

interface AdminDrawerSideProps {}

const AdminDrawerSide: FunctionComponent<AdminDrawerSideProps> = () => {
  const router = useRouter();

  const logoutClicked = async () => {
    await destroyCookie(null, "user");
    router.reload();
  };

  return (
    <div className="border-r border-base-300 drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="justify-between w-4/5 p-4 pt-8 overflow-y-auto md:pt-10 lg:pt-12 sm:w-3/5 md:w-96 lg:w-80 menu bg-base-100 text-base-content">
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
          <li className="-mx-4 menu-title">
            <div className="flex flex-col gap-8 lg:hidden">
              <AdminProfileLink />

              <AdminNewProductAndCategoryLinks />
            </div>

            <AdminDashboardLink />
          </li>

          <div>
            <AdminSideBarItems />
          </div>
        </div>

        <li className="text-xl">
          <a onClick={logoutClicked}>
            <HiOutlineLogout /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminDrawerSide;
