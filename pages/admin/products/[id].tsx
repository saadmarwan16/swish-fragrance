import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import adminServerProps from "../../../src/shared/utils/adminServerProps";

interface ProductDetailsPageProps {
  id: string;
}

const ProductDetails: NextPage<ProductDetailsPageProps> = ({ id }) => {
  return (
    <AdminLayout titlePrefix="Product Details">
      <div className="text-4xl font-semibold">
        Product Details View is working with id {id}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return adminServerProps(ctx, async () => {
    return {
      props: {
        id: ctx.query.id as string,
      },
    };
  });
};

export default ProductDetails;
