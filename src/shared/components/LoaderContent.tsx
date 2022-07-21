import { FunctionComponent } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface LoaderContentProps {}

const LoaderContent: FunctionComponent<LoaderContentProps> = () => {
  return (
    <div className="flex-col px-2 text-center py-28 custom-flex-center">
      <BeatLoader color={"#59C3C3"} size={20} />
    </div>
  );
};

export default LoaderContent;
