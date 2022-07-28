import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
import homeController from "../../src/modules/admin/home/controllers/home_controller";
import AdminLayout from "../../src/shared/components/AdminLayout";
import { HOME_TAB_MONTHLY, HOME_TAB_WEEKLY, HOME_TAB_YEARLY } from "../../src/shared/constants/strings";
// import { MdDashboard } from "react-icons/md";

interface AdminDashboardPageProps {}

const AdminDashboard: NextPage<AdminDashboardPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Dashboard">
      <div className="">
        <div className="flex flex-col justify-center gap-4 sm:justify-start sm:flex-row sm:items-center">
          <p className="custom-heading1">Dashboard</p>

          <div className="bg-transparent tabs tabs-boxed">
            <a
              className={`tab ${
                homeController.tab === HOME_TAB_WEEKLY &&
                "font-semibold tab-active"
              }`}
              onClick={() => homeController.updateTab(HOME_TAB_WEEKLY)}
            >
              Weekly
            </a>
            <a
              className={`tab ${
                homeController.tab === HOME_TAB_MONTHLY &&
                "font-semibold tab-active"
              }`}
              onClick={() => homeController.updateTab(HOME_TAB_MONTHLY)}
            >
              Monthly
            </a>
            <a
              className={`tab ${
                homeController.tab === HOME_TAB_YEARLY &&
                "font-semibold tab-active"
              }`}
              onClick={() => homeController.updateTab(HOME_TAB_YEARLY)}
            >
              Yearly
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default observer(AdminDashboard);
