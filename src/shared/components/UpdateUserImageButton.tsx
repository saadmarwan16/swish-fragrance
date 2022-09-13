import { FunctionComponent } from "react";
import { RiImageEditFill } from "react-icons/ri";
import Image from "next/image";
import { useAuthContext } from "../../modules/auth/AuthContext";
import { BASE_URL } from "../constants/urls";

interface UpdateUserImageButtonProps {}

const UpdateUserImageButton: FunctionComponent<
  UpdateUserImageButtonProps
> = () => {
  const { user } = useAuthContext();

  return (
    <div className="w-40 h-40 sm:w-48 sm:h-48">
      <input
        type="file"
        accept="image/*"
        id="image"
        className="hidden"
        onChange={(e) => {}}
      />

      <label htmlFor="image">
        <div className="h-40 shadow-xl sm:h-48 card bg-base-100 image-full">
          <figure>
            <Image
              // src="/images/no_profile_image.webp"
              src={
                user?.image?.url
                  ? `${BASE_URL}${user.image.url}`
                  : "/images/no_profile_image.webp"
              }
              layout="fill"
              alt="Profile Image"
            />
          </figure>  

          <div className="items-center justify-center card-body">
            <div className="flex flex-col items-center cursor-pointer hover:text-base-100">
              <RiImageEditFill
                className={`text-4xl cursor-pointer hover:text-base-100`}
              />
              <p className="text-center">Click to update image</p>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default UpdateUserImageButton;
