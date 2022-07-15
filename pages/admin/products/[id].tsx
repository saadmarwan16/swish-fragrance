import type { NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";

interface ProductDetailsPageProps {}

const ProductDetails: NextPage<ProductDetailsPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Product Details">
      <div className="text-4xl font-semibold">Product Details View is working</div>
    </AdminLayout>
  );
};

export default ProductDetails;
