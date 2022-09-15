import { FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { RiImageAddFill } from "react-icons/ri";

interface UploadImageButtonProps {
  register: UseFormRegisterReturn;
}

const UploadImageButton: FunctionComponent<UploadImageButtonProps> = ({
  register,
}) => {
  return (
    <div className="w-60 h-60 sm:w-72 sm:h-72">
      <input
        type="file"
        accept="image/*"
        id="image"
        className="hidden"
        {...register}
      />

      <label htmlFor="image">
        <div className="flex-col gap-2 px-2 py-8 border rounded-lg h-60 sm:h-72 custom-flex-center border-base-300 sm:py-16 text-secondary hover:bg-base-200 hover:cursor-pointer">
          <RiImageAddFill className="text-3xl" />
          <p className="font-semibold text-gray-600">Click to add an image</p>
        </div>
      </label>
    </div>
  );
};

export default UploadImageButton;
