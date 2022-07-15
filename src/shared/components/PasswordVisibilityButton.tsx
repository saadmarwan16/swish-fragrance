import { FunctionComponent } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";

interface PasswordVisibilityButtonProps {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordVisibilityButton: FunctionComponent<
  PasswordVisibilityButtonProps
> = ({ isPasswordVisible, togglePasswordVisibility }) => {
  if (isPasswordVisible) {
    return (
      <button
        className="px-2 sm:px-4 bg-base-300"
        onClick={togglePasswordVisibility}
      >
        <AiOutlineEyeInvisible className="text-lg sm:text-xl" />
      </button>
    );
  } else {
    return (
      <button
        className="px-2 sm:px-4 bg-base-300"
        onClick={togglePasswordVisibility}
      >
        <MdOutlineVisibility className="text-lg sm:text-xl" />
      </button>
    );
  }
};

export default PasswordVisibilityButton;
