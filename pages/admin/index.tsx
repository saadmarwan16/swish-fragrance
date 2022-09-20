import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";
import {
  HOME_TAB_MONTHLY,
  HOME_TAB_WEEKLY,
  HOME_TAB_YEARLY,
} from "../../src/shared/constants/strings";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { GrView } from "react-icons/gr";
import adminServerProps from "../../src/shared/utils/adminServerProps";
import dashboardController from "../../src/modules/dashboard/controllers/dashboard_controller";
import { ErrorModel } from "../../src/shared/data/models/errror_model";
import { DashboardModel } from "../../src/modules/dashboard/data/models/dashboard_model";
import LoaderContent from "../../src/shared/components/LoaderContent";
import { useMemo, useState } from "react";
import { TDashboardDuration } from "../../src/shared/types/types";
import AdminDashboardOrdersTable from "../../src/modules/dashboard/components/AdminDashboardOrdersTable";
import AdminDashboardProductsList from "../../src/modules/dashboard/components/AdminDashboardProductsList";
import getDashboardRevenue from "../../src/shared/utils/getDashboardRevenue";
import { IDashboardItem } from "../../src/shared/types/interfaces";
import getDashboardCost from "../../src/shared/utils/getDashboardCost";
import getDashboardOrders from "../../src/shared/utils/getDashboardOrders";
import { TbWaveSawTool } from "react-icons/tb";
import getDashboardProducts from "../../src/shared/utils/getDashboardProducts";
import getDashboardProfit from "../../src/shared/utils/getDashboardProfit";

interface AdminDashboardPageProps {
  error: ErrorModel | null;
  results: DashboardModel | null;
}

const AdminDashboard: NextPage<AdminDashboardPageProps> = ({
  error,
  results,
}) => {
  const [dashboard, setDashboard] = useState(results);
  const dashboardItems = useMemo(() => {
    const items: IDashboardItem[] = [
      getDashboardRevenue(
        dashboard?.data.attributes.previous_orders!,
        dashboard?.data.attributes.orders!
      ),
      getDashboardProfit(
        dashboard?.data.attributes.previous_orders!,
        dashboard?.data.attributes.orders!
      ),
      getDashboardCost(
        dashboard?.data.attributes.previous_orders!,
        dashboard?.data.attributes.orders!
      ),
      getDashboardOrders(
        dashboard?.data.attributes.previous_orders!,
        dashboard?.data.attributes.orders!
      ),
      getDashboardProducts(
        dashboard?.data.attributes.previous_orders!,
        dashboard?.data.attributes.orders!
      ),
      {
        icon: <GrView />,
        title: "Visitors",
        value: "2,564",
        level: "decreased",
        difference: "-15%",
      },
    ];

    return items;
  }, [dashboard]);

  const updateTab = (value: string, duration: TDashboardDuration) => {
    dashboardController.updateTab(value, duration).then((res) => {
      const { error, results } = res;

      if (error) return;

      setDashboard(results);
    });
  };

  return (
    <AdminLayout titlePrefix="Dashboard">
      <div>
        <div className="flex flex-col justify-center gap-4 sm:justify-start sm:flex-row sm:items-center">
          <p className="custom-heading1">Dashboard</p>

          <div className="bg-transparent tabs tabs-boxed">
            <a
              className={`tab ${
                dashboardController.tab === HOME_TAB_WEEKLY &&
                "font-semibold tab-active"
              }`}
              onClick={() => updateTab(HOME_TAB_WEEKLY, "week")}
            >
              Weekly
            </a>
            <a
              className={`tab ${
                dashboardController.tab === HOME_TAB_MONTHLY &&
                "font-semibold tab-active"
              }`}
              onClick={() => updateTab(HOME_TAB_MONTHLY, "month")}
            >
              Monthly
            </a>
            <a
              className={`tab ${
                dashboardController.tab === HOME_TAB_YEARLY &&
                "font-semibold tab-active"
              }`}
              onClick={() => updateTab(HOME_TAB_YEARLY, "year")}
            >
              Yearly
            </a>
          </div>
        </div>

        {dashboardController.loading ? (
          <LoaderContent />
        ) : (
          <div className="statistics-grid-container">
            <div className="statistics-grid">
              {dashboardItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 px-4 py-8 rounded-lg bg-base-200"
                >
                  <div className="p-2 text-3xl rounded-lg bg-secondary">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl">{item.value}</span>
                    <div className="flex items-center gap-4 text-base text-gray-500 sm:text-lg">
                      <span>{item.title}</span>
                      {item.level === "maintained" && (
                        <small className="flex items-center gap-0.5 text-gray-500">
                          <TbWaveSawTool />
                          {item.difference}
                        </small>
                      )}
                      {item.level === "increased" && (
                        <small className="flex items-center gap-0.5 text-success">
                          <IoMdArrowDropup />
                          {item.difference}
                        </small>
                      )}
                      {item.level === "decreased" && (
                        <small className="flex items-center gap-0.5 text-error">
                          <IoMdArrowDropdown />
                          {item.difference}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-8 overflow-visible xl:flex-row">
              <AdminDashboardOrdersTable
                orders={dashboard?.data.attributes.orders!}
              />

              <AdminDashboardProductsList
                products={dashboard?.data.attributes.products!}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return adminServerProps(ctx, async () => {
    return {
      props: await dashboardController.getAll("week"),
    };
  });
};

export default observer(AdminDashboard);
