import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import authController from "../../modules/auth/controllers/auth_controller";

interface FormSubmitButtonProps {}

const FormSubmitButton: FunctionComponent<FormSubmitButtonProps> = () => {
  return (
    <button
      type="submit"
      className={`custom-primary-button ${authController.loading && "loading"}`}
    >
      Login
    </button>
  );
};

export default observer(FormSubmitButton);
