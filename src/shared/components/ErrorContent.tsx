import { FunctionComponent } from "react";
import { BiErrorCircle } from "react-icons/bi";

interface ErrorContentProps {
    title: string;
  setContent: () => void;
}

const ErrorContent: FunctionComponent<ErrorContentProps> = ({title, setContent }) => {
  return (
    <div className="flex-col px-2 py-16 text-center custom-flex-center">
      <BiErrorCircle className="text-5xl sm:text-6xl md:text-8xl text-error" />
      <p className="custom-heading2 text-error">An error occured</p>
      <p>Cannot find {title}</p>
      <button className="mt-6 btn btn-primary btn-sm" onClick={setContent}>
        Retry
      </button>
    </div>
  );
};

export default ErrorContent;
