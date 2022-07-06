import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface NewCategoryPageProps {}

const NewCategory: NextPage<NewCategoryPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="New Category">
      <div className="text-4xl font-semibold">New Category View is working</div>
    </AdminLayout>
  );
};

export default NewCategory;
