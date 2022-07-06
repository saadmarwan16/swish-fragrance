import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface AdminDashboardPageProps {}

const AdminDashboard: NextPage<AdminDashboardPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Dashboard">
      <div className="text-4xl font-semibold">Admin Dashboard View is Working</div>
    </AdminLayout>
  );
};

export default AdminDashboard;
