import { FunctionComponent } from "react";
import { RiImageEditFill } from "react-icons/ri";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { UseFormRegisterReturn } from "react-hook-form";

interface UpdateImageButtonProps {
  register: UseFormRegisterReturn;
  image: string;
  removeImage: () => void;
}

const UpdateImageButton: FunctionComponent<UpdateImageButtonProps> = ({
  register,
  image,
  removeImage,
}) => {
  return (
    <div className="h-60 sm:w-72 sm:h-72 w-60">
      <input
        type="file"
        accept="image/*"
        id="image"
        className="hidden"
        {...register}
      />

      <div className="shadow-xl h-60 sm:h-72 card bg-base-100 image-full">
        <figure>
          <Image src={image} layout="fill" alt="Brand Image" />
        </figure>

        <div className="items-center justify-center card-body">
          <div className="flex items-center gap-4">
            <label htmlFor="image">
              <RiImageEditFill className="text-4xl cursor-pointer hover:text-base-100" />
            </label>

            <MdDelete
              className="text-4xl cursor-pointer hover:text-base-100"
              onClick={removeImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateImageButton;
