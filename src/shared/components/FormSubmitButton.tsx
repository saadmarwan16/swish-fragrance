import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import loginController from "../../modules/login/controllers/login_controller";

interface FormSubmitButtonProps {}

const FormSubmitButton: FunctionComponent<FormSubmitButtonProps> = () => {
  return (
    <button
      type="submit"
      className={`custom-primary-button ${
        loginController.isLoggingIn && "loading"
      }`}
    >
      Login
    </button>
  );
};

export default observer(FormSubmitButton);
