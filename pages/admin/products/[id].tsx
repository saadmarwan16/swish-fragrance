import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";

interface ProductDetailsPageProps {
  id: string;
}

const ProductDetails: NextPage<ProductDetailsPageProps> = ({id}) => {
  return (
    <AdminLayout titlePrefix="Product Details">
      <div className="text-4xl font-semibold">Product Details View is working with id {id}</div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  return {
    props: {
      id: query.id as string,
    }
  }
}

export default ProductDetails;
