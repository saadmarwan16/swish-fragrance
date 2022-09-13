import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import homeController from "../../src/modules/home/controllers/home_controller";
import AdminLayout from "../../src/shared/components/AdminLayout";
import {
  HOME_TAB_MONTHLY,
  HOME_TAB_WEEKLY,
  HOME_TAB_YEARLY,
} from "../../src/shared/constants/strings";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import Routes from "../../src/shared/constants/routes";
import Link from "next/link";
import { FunctionComponent } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { AiOutlineShopping } from "react-icons/ai";
import { IoPricetagOutline, IoPricetagsOutline } from "react-icons/io5";
import adminServerProps from "../../src/shared/utils/adminServerProps";
import dashboardController from "../../src/modules/dashboard/controllers/dashboard_controller";
import { ErrorModel } from "../../src/shared/data/models/errror_model";
import { DashboardModel } from "../../src/modules/dashboard/data/models/dashboard_model";

interface AdminDashboardPageProps {
  error: ErrorModel | null;
  results: DashboardModel | null;
}

interface AdminDashboardTableProps {}

interface IDashboardItem {
  icon: JSX.Element;
  title: string;
  value: string;
  increased: boolean;
  difference: string;
}

interface IDashboard {
  items: IDashboardItem[];
}

const dashboard: IDashboard = {
  items: [
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
  ],
};

const AdminDashboardTable: FunctionComponent<AdminDashboardTableProps> = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src="/tailwind-css-component-profile-3@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
              <br />
              <span className="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>Red</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src="/tailwind-css-component-profile-4@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                  <div className="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
              <br />
              <span className="badge badge-ghost badge-sm">
                Office Assistant I
              </span>
            </td>
            <td>Crimson</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src="/tailwind-css-component-profile-5@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
              <br />
              <span className="badge badge-ghost badge-sm">
                Community Outreach Specialist
              </span>
            </td>
            <td>Indigo</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboard: NextPage<AdminDashboardPageProps> = ({
  error,
  results,
}) => {
  console.log(results);

  return (
    <AdminLayout titlePrefix="Dashboard">
      <div className="">
        <div className="flex flex-col justify-center gap-4 sm:justify-start sm:flex-row sm:items-center">
          <p className="custom-heading1">Dashboard</p>

          <div className="bg-transparent tabs tabs-boxed">
            <a
              className={`tab ${
                dashboardController.tab === HOME_TAB_WEEKLY &&
                "font-semibold tab-active"
              }`}
              onClick={() =>
                dashboardController.updateTab(HOME_TAB_WEEKLY, "week")
              }
            >
              Weekly
            </a>
            <a
              className={`tab ${
                dashboardController.tab === HOME_TAB_MONTHLY &&
                "font-semibold tab-active"
              }`}
              onClick={() =>
                dashboardController.updateTab(HOME_TAB_MONTHLY, "month")
              }
            >
              Monthly
            </a>
            <a
              className={`tab ${
                dashboardController.tab === HOME_TAB_YEARLY &&
                "font-semibold tab-active"
              }`}
              onClick={() =>
                dashboardController.updateTab(HOME_TAB_YEARLY, "year")
              }
            >
              Yearly
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-12 mt-8 sm:mt-10 md:mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:gap-6 md:gap-8 lg:gap-10">
            {dashboard.items.map((item, index) => (
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
            <div className="flex flex-col w-full gap-6 p-2 border rounded-lg md:p-3 border-base-300 xl:w-2/3">
              <div className="flex justify-between">
                <h2 className="custom-heading2">Orders</h2>
                <Link href={Routes.ORDERS}>
                  <a className="custom-subtitle1 hover:text-blue-500">
                    See All
                  </a>
                </Link>
              </div>

              <AdminDashboardTable />
            </div>
            <div className="flex flex-col w-full gap-6 p-2 border rounded-lg md:p-3 border-base-300 xl:w-1/3">
              <div className="flex justify-between">
                <h2 className="custom-heading2">Top Selling Products</h2>
                <Link href={Routes.NOTIFICATIONS}>
                  <a className="custom-subtitle1 hover:text-blue-500">
                    See All
                  </a>
                </Link>
              </div>

              <AdminDashboardTable />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // console.log(dayjs().startOf('week').format("YYYY-MM-DD"));
  // console.log(dayjs().startOf('week').subtract(1, 'week').format("YYYY-MM-DD"));
  // console.log(dayjs().startOf('week').subtract(1, 'day').format("YYYY-MM-DD"));

  // console.log(dayjs().startOf('month').format("YYYY-MM-DD"));
  // console.log(dayjs().startOf('month').subtract(1, 'month').format("YYYY-MM-DD"));
  // console.log(dayjs().startOf('month').subtract(1, 'day').format("YYYY-MM-DD"));

  return adminServerProps(ctx, async () => {
    return {
      props: await dashboardController.getAll("week"),
    };
  });
};

export default observer(AdminDashboard);
