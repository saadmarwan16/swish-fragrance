import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";
import UpdateUserImageButton from "../../src/shared/components/UpdateUserImageButton";
import { MdEdit } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import { useState } from "react";

interface ProfilePageProps {}

const Profile: NextPage<ProfilePageProps> = ({}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AdminLayout titlePrefix="Profile">
      <div className="flex flex-col items-center justify-center gap-6 px-4 py-10">
        <UpdateUserImageButton />

        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold">Abdul Rahman</p>
          <span className="flex gap-2">
            <p className="text-gray-500">Role:</p>
            <p className="font-semibold">Master Admin</p>
          </span>
          <p className="text-gray-500">mrghana30@gmail.com</p>
          <p className="text-sm text-primary">@rahmansaad16</p>
        </div>

        <div className="flex flex-col items-center gap-3 w-60 sm:w-72">
          <div className="flex gap-6">
            <button
              className={`gap-2 btn btn-outline btn-sm btn-secondary ${
                isEditing && "btn-disabled"
              }`}
              onClick={() => setIsEditing(true)}
            >
              <MdEdit /> Edit
            </button>
            <button
              className={`gap-2 btn btn-sm btn-primary ${
                !isEditing && "btn-disabled"
              }`}
              onClick={() => setIsEditing(false)}
            >
              <FiSave /> Save
            </button>
          </div>

          <button className={"gap-2 btn btn-sm btn-primary flex-grow"}>
            <FaExchangeAlt />
            Change Password
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
