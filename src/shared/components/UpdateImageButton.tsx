import { FunctionComponent } from "react";
import { RiImageEditFill } from "react-icons/ri";
import Image from "next/image";
import { IImageDetails } from "../types/interfaces";
import { BASE_URL } from "../constants/urls";
import brandsController from "../../modules/admin/brands/brands_controller";
import { BRAND_IMAGE_LOCAL_STORAGE_KEY } from "../constants/strings";

interface UpdateImageButtonProps {
  imageLocalStorageKey: string;
  imageDetails: IImageDetails;
  setIsImageAdded: () => void;
  setImageDetails: (id: number, url: string) => void;
}

const UpdateImageButton: FunctionComponent<UpdateImageButtonProps> = ({
  imageLocalStorageKey,
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
          brandsController.uploadImage(formData).then((res) => {
            if (res !== null) {
              const previousImageId = imageDetails.id;

              setImageDetails(res[0].id, res[0].url);
              setIsImageAdded();
              localStorage.setItem(
                imageLocalStorageKey,
                JSON.stringify({
                  id: res[0].id,
                  url: res[0].url,
                })
              );
              brandsController.deleteImage(previousImageId);
            }
          });
        }}
      />

      <label htmlFor="image">
        <div className="shadow-xl h-60 sm:h-72 card bg-base-100 image-full">
          <figure>
            <Image
              src={`${BASE_URL}${imageDetails.url}`}
              layout="fill"
              alt="Brand Image"
            />
          </figure>

          <div className="items-center justify-center card-body">
            <div className="flex flex-col items-center cursor-pointer hover:text-base-100">
              <RiImageEditFill
                className={`text-4xl cursor-pointer hover:text-base-100`}
              />
              <p>Click to update image</p>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default UpdateImageButton;
