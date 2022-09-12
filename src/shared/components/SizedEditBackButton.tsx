import { FunctionComponent } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

interface SizedEditBackButtonProps {
  title: string;
  onClick?: () => void;
}

const SizedEditBackButton: FunctionComponent<SizedEditBackButtonProps> = ({
  title,
  onClick,
}) => {
  return (
    <button className={`!w-fit custom-primary-button gap-3`} onClick={onClick}>
      {title === "Edit" ? <MdModeEditOutline /> : <BiArrowBack />}
      {title}
    </button>
  );
};

export default SizedEditBackButton;
