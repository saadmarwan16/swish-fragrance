import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";
import {
  HOME_TAB_MONTHLY,
  HOME_TAB_WEEKLY,
  HOME_TAB_YEARLY,
} from "../../src/shared/constants/strings";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { AiOutlineShopping } from "react-icons/ai";
import { IoPricetagOutline, IoPricetagsOutline } from "react-icons/io5";
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

interface AdminDashboardPageProps {
  error: ErrorModel | null;
  results: DashboardModel | null;
}

const dashboardData: IDashboardItem[] = [
  {
    icon: <IoPricetagsOutline />,
    title: "Revenue",
    value: "GH$ 2,564",
    increased: false,
    difference: "-75%",
  },
  {
    icon: <MdOutlineAttachMoney />,
    title: "Profit",
    value: "GH$ 2,564",
    increased: false,
    difference: "-75%",
  },
  {
    icon: <IoPricetagOutline />,
    title: "Cost",
    value: "GH$ 2,564",
    increased: false,
    difference: "-75%",
  },
  {
    icon: <GiShoppingCart />,
    title: "Orders",
    value: "GH$ 2,564",
    increased: false,
    difference: "-75%",
  },
  {
    icon: <AiOutlineShopping />,
    title: "Products",
    value: "GH$ 2,564",
    increased: false,
    difference: "-75%",
  },
  {
    icon: <GrView />,
    title: "Visitors",
    value: "GH$ 2,564",
    increased: true,
    difference: "+75%",
  },
];

const AdminDashboard: NextPage<AdminDashboardPageProps> = ({
  error,
  results,
}) => {
  const [dashboard, setDashboard] = useState(results);
  const dashboardItems = useMemo(() => {
    const items: IDashboardItem[] = [];
    const revenue = getDashboardRevenue(
      dashboard?.data.attributes.previous_orders!,
      dashboard?.data.attributes.orders!
    );
    const cost = getDashboardCost(
      dashboard?.data.attributes.previous_orders!,
      dashboard?.data.attributes.orders!
    );

    items.push(revenue);
    items.push(cost);

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
          <div className="flex flex-col gap-12 mt-8 sm:mt-10 md:mt-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:gap-6 md:gap-8 lg:gap-10">
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
                      <small
                        className={`flex items-center gap-0.5 ${
                          item.increased ? "text-success" : "text-error"
                        }`}
                      >
                        {item.increased ? (
                          <IoMdArrowDropup />
                        ) : (
                          <IoMdArrowDropdown />
                        )}{" "}
                        {item.difference}
                      </small>
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
