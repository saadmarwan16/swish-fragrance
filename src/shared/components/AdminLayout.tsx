import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";
import AdminDate from "./AdminDate";
import useCustomBreakPointContext from "../hooks/useCustomBreakPoint";
import AdminDrawerSide from "./AdminDrawerSide";
import AdminHeader from "./AdminHeader";
import MetaTags from "./MetaTags";

interface AdminLayoutProps {
  children: ReactNode;
  titlePrefix: string;
}

const AdminLayout: FunctionComponent<AdminLayoutProps> = ({
  children,
  titlePrefix,
}) => {
  const { maxWidth } = useCustomBreakPointContext();

  return (
    <>
    <MetaTags titlePrefix={titlePrefix + ' - Admin'} />

      <div className="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="p-4 md:p-6 lg:p-8 drawer-content">
          <AdminHeader />

          <div className="py-4">
            {!!maxWidth && maxWidth < 640 && <AdminDate />}

            <div>{children}</div>
          </div>
        </div>

        <AdminDrawerSide />
      </div>
    </>
  );
};

export default AdminLayout;
