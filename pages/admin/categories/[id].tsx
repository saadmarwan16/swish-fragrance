import type { NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";

interface CategoryDetailsPageProps {}

const CategoryDetails: NextPage<CategoryDetailsPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Category Details">
      <div className="text-4xl font-semibold">Category Details View is working</div>
    </AdminLayout>
  );
};

export default CategoryDetails;
