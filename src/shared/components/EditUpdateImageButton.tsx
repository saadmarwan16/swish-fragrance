import { FunctionComponent } from "react";
import Image from "next/image";
import imagesController from "../controllers/images_controller";
import { BASE_URL } from "../constants/urls";
import { IImageDetails } from "../types/interfaces";
import { RiImageEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface EditUpdateImageButtonProps {
  imageDetails: IImageDetails;
  setIsImageAdded: (value: boolean) => void;
  setImageDetails: (value: IImageDetails | null) => void;
}

const EditUpdateImageButton: FunctionComponent<EditUpdateImageButtonProps> = ({
  imageDetails,
  setIsImageAdded,
  setImageDetails,
}) => {
  return (
    <div className="h-60 sm:w-72 sm:h-72 w-60">
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
              const previousImageId = imageDetails.id;

              setImageDetails({ id: res[0].id, url: res[0].url });
              setIsImageAdded(true);
              imagesController.delete(previousImageId.toString());
            }
          });
        }}
      />

      <div className="shadow-xl h-60 sm:h-72 card bg-base-100 image-full">
        <figure>
          <Image
            src={`${BASE_URL}${imageDetails.url}`}
            layout="fill"
            alt="Brand Image"
          />
        </figure>

        <div className="items-center justify-center card-body">
          <div className="flex items-center gap-4">
            <label htmlFor="image">
              <RiImageEditFill className="text-4xl cursor-pointer hover:text-base-100" />
            </label>

            <MdDelete
              className="text-4xl cursor-pointer hover:text-base-100"
              onClick={() => {
                imagesController
                  .delete(imageDetails.id.toString())
                  .then((_) => {
                    setIsImageAdded(false);
                    setImageDetails(null);
                  });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUpdateImageButton;
