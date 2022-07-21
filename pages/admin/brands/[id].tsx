import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";

interface BrandDetailsPageProps {
  id: string;
}

const BrandDetails: NextPage<BrandDetailsPageProps> = ({id}) => {
  return (
    <AdminLayout titlePrefix="Brand Details">
      <div className="text-4xl font-semibold">Brand Details View is working with id {id}</div>
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

export default BrandDetails;
