import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface NewProductPageProps {}

const NewProduct: NextPage<NewProductPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="New Product">
      <div className="text-4xl font-semibold">New Product View is working</div>
    </AdminLayout>
  );
};

export default NewProduct;
