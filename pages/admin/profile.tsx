import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface ProfilePageProps {}

const Profile: NextPage<ProfilePageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Profile">
      <div className="text-4xl font-semibold">Profile View is working</div>
    </AdminLayout>
  );
};

export default Profile;
