import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface NotificationsPageProps {}

const Notifications: NextPage<NotificationsPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Notifications">
      <div className="text-4xl font-semibold">Notifications View is working</div>
    </AdminLayout>
  );
};

export default Notifications;
