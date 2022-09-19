import { FunctionComponent } from "react";
import { MdDelete } from "react-icons/md";

interface SizedDeleteButtonProps {
  loading: boolean;
  onClick?: () => void;
}

const SizedDeleteButton: FunctionComponent<SizedDeleteButtonProps> = ({
  loading,
  onClick,
}) => {
  return (
    <button type={'button'} className={`!w-fit custom-primary-button gap-3 ${loading && 'loading'}`} onClick={onClick}>
      <MdDelete />
      Delete
    </button>
  );
};

export default SizedDeleteButton;
