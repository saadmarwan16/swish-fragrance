import { FunctionComponent } from "react";
import { RiImageAddFill } from "react-icons/ri";

interface UploadImageButtonProps {}

const UploadImageButton: FunctionComponent<UploadImageButtonProps> = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex-col gap-2 px-2 py-8 border rounded-lg custom-flex-center border-base-300 sm:w-1/2 sm:py-16 text-secondary hover:bg-base-200 hover:cursor-pointer">
        <RiImageAddFill className="text-3xl" />
        <p className="font-semibold text-gray-600">Click to add an image</p>
      </div>

      {/* <p className="text-gray-500">No image added</p> */}
    </div>
  );
};

export default UploadImageButton;
