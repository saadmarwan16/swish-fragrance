import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import {
  ConvertLoginErrorModel,
} from "../../../shared/errors/login_error_model";
import errorToast from "../../../shared/utils/errorToast";
import getUnexpectedError from "../../../shared/utils/getUnexpectedError";
import { LoginModel } from "./login_model";
import loginProvider from "./login_provider";

export class LoginController {
  isLoggingIn = false;
  identifier = "";
  password = "";
  failureOrUser: LoginModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  onIdentifierChanged = (value: string) => {
    this.identifier = value;
  };

  onPasswordChanged = (value: string) => {
    this.password = value;
  };

  onLoginButtonClicked = async () => {
    try {
      this.isLoggingIn = true;
      const user = await loginProvider.login(
        JSON.stringify({ identifier: this.identifier, password: this.password })
      );

      errorToast('Success', 'It was a success');
    } catch (e) {
      if (e instanceof AxiosError) {
        const results = ConvertLoginErrorModel.toLoginErrorModel(
          JSON.stringify(e.response?.data)
        );

        errorToast(results.error.name, results.error.message);
      }

      const results = getUnexpectedError();
      errorToast(results.name, results.message);
    } finally {
      this.isLoggingIn = false;
    }
  };
}

const loginController = new LoginController();
export default loginController;
