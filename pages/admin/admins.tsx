import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface AdminsPageProps {}

const Admins: NextPage<AdminsPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Admins">
      <div className="text-4xl font-semibold">Admins View is working</div>
    </AdminLayout>
  );
};

export default Admins;
