import { FunctionComponent } from "react";
import { BiSave } from "react-icons/bi";

interface SizedSaveButtonProps {
  isLoading: boolean;
  // onClick?: () => void;
  title: string;
  isDisabled?: boolean;
}

const SizedSaveButton: FunctionComponent<SizedSaveButtonProps> = ({
  isLoading,
  // onClick,
  title,
  isDisabled = false,
}) => {
  return (
    <button
      className={`!w-fit custom-primary-button gap-3 ${
        isLoading && "loading"
      } ${isDisabled && "!btn-disabled"}`}
      type="submit"
      // onClick={onClick}
    >
      <BiSave />
      {title}
    </button>
  );
};

export default SizedSaveButton;
