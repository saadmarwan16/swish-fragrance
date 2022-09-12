import { FunctionComponent } from "react";
import { MdDelete } from "react-icons/md";

interface SizedDeleteButtonProps {
  onClick?: () => void;
}

const SizedDeleteButton: FunctionComponent<SizedDeleteButtonProps> = ({
  onClick,
}) => {
  return (
    <button className={`!w-fit custom-primary-button gap-3`} onClick={onClick}>
      <MdDelete />
      Delete
    </button>
  );
};

export default SizedDeleteButton;
