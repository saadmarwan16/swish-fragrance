import Link from "next/link";
import { FunctionComponent } from "react";
import Routes from "../constants/routes";
import { AiOutlinePlus } from "react-icons/ai";

interface AdminNewProductAndCategoryLinksProps {}

const AdminNewProductAndCategoryLinks: FunctionComponent<
  AdminNewProductAndCategoryLinksProps
> = () => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Link href={Routes.NEW_PRODUCT}>
        <a className="gap-2 font-medium btn btn-secondary btn-outline">
          <AiOutlinePlus className="text-2xl" />
          New Product
        </a>
      </Link>
      <Link href={Routes.NEW_CATEGORY}>
        <a className="gap-2 font-medium btn btn-primary">
          <AiOutlinePlus className="text-2xl" />
          New Category
        </a>
      </Link>
    </div>
  );
};

export default AdminNewProductAndCategoryLinks;
