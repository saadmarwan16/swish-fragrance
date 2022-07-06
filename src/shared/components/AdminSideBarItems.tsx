import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import adminIsActive from "../utils/adminIsActive";

interface AdminSideBarItemsProps {}

const AdminSideBarItems: FunctionComponent<AdminSideBarItemsProps> = () => {
  const router = useRouter();

  return (
    <>
      {adminIsActive(router.pathname).map((item, index) => (
        <li
          key={index}
          className={`text-xl flex-row ${
            item.isActive ? "text-violet-700 active" : ""
          }`}
          onClick={() => router.push(item.route)}
        >
          <a className="flex-grow focus:bg-violet-700">
            {item.icon}
            {item.title}
          </a>
          {item.isActive && (
            <span className="absolute flex-grow-0 h-12 cursor-default -right-4 hover:bg-transparent">
              <span className="relative w-1 h-12 -right-4 bg-violet-700"></span>
            </span>
          )}
        </li>
      ))}
    </>
  );
};

export default AdminSideBarItems;
