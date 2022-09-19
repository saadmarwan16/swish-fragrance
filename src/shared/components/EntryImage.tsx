import { FunctionComponent } from "react";
import InputField from "./InputField";
import UpdateImageButton from "./UpdateImageButton";
import UploadImageButton from "./UploadImageButton";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface EntryImageProps {
  image: string | null;
  registerName: UseFormRegisterReturn;
  nameError: FieldError | undefined;
  registerUpdateImage: UseFormRegisterReturn;
  registerUploadImage: UseFormRegisterReturn;
  removeImage: () => void;
}

const EntryImage: FunctionComponent<EntryImageProps> = ({
  image,
  registerName,
  nameError,
  registerUpdateImage,
  registerUploadImage,
  removeImage,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-8">
      {image ? (
        <UpdateImageButton
          register={registerUpdateImage}
          image={image}
          removeImage={removeImage}
        />
      ) : (
        <UploadImageButton register={registerUploadImage} />
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="w-full">
          <InputField
            type="text"
            error={nameError}
            label="Brand name"
            placeholder="Enter brand name here"
            register={registerName}
          />
        </div>
      </div>
    </div>
  );
};

export default EntryImage;
