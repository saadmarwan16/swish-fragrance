import { FunctionComponent } from "react";
import { RiImageAddFill, RiImageEditFill } from "react-icons/ri";

interface UploadImageButtonProps {
  isImageAdded: boolean;
}

const UploadImageButton: FunctionComponent<UploadImageButtonProps> = ({
  isImageAdded,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex-col gap-2 px-2 py-8 border rounded-lg custom-flex-center border-base-300 sm:w-1/3 sm:py-16 text-secondary hover:bg-base-200 hover:cursor-pointer">
        {isImageAdded ? (
          <RiImageEditFill className="text-3xl" />
        ) : (
          <RiImageAddFill className="text-3xl" />
        )}
        <p className="font-semibold text-gray-600">
          Click to {isImageAdded ? "update" : "add an"} image
        </p>
      </div>

      <p className="text-gray-500">
        {isImageAdded ? "An image was added" : "No image added"}
      </p>
    </div>
  );
};

export default UploadImageButton;
