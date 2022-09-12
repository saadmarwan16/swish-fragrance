import { FunctionComponent } from "react";
import { RiImageAddFill } from "react-icons/ri";
import imagesController from "../controllers/images_controller";
import { IImageDetails } from "../types/interfaces";

interface EditUploadImageButtonProps {
  setIsImageAdded: () => void;
  setImageDetails: (value: IImageDetails) => void;
}

const EditUploadImageButton: FunctionComponent<EditUploadImageButtonProps> = ({
  setIsImageAdded,
  setImageDetails,
}) => {
  return (
    <div className="w-60 h-60 sm:w-72 sm:h-72">
      <input
        type="file"
        accept="image/*"
        id="image"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files === null) return;

          const formData = new FormData();
          formData.append("files", files[0]);
          imagesController.create(formData).then((res) => {
            if (res !== null) {
              setImageDetails({ id: res[0].id, url: res[0].url });
              setIsImageAdded();
            }
          });
        }}
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

export default EditUploadImageButton;
