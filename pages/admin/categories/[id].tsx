import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";

interface CategoryDetailsPageProps {
  id: string;
}

const CategoryDetails: NextPage<CategoryDetailsPageProps> = ({id}) => {
  return (
    <AdminLayout titlePrefix="Category Details">
      <div className="text-4xl font-semibold">Category Details View is working with id {id}</div>
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

export default CategoryDetails;
