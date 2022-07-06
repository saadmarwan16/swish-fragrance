import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface ProductsPageProps {}

const Products: NextPage<ProductsPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Products">
      <div className="text-4xl font-semibold">Products View is working</div>
    </AdminLayout>
  );
};

export default Products;
