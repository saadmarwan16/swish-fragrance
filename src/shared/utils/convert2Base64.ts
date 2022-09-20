import { Dispatch, SetStateAction } from "react";

const convert2base64 = (
  file: File,
  setImage: Dispatch<SetStateAction<string | null>>
) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(reader.result?.toString() ?? null);
  };

  reader.readAsDataURL(file);
};

export default convert2base64;
