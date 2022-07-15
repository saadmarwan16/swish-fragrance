import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import Router from "next/router";
import { setCookie } from "nookies";
import Routes from "../../../shared/constants/routes";
import { ConvertLoginErrorModel } from "../../../shared/errors/login_error_model";
import { ILoginInputs } from "../../../shared/types/interfaces";
import errorToast from "../../../shared/utils/errorToast";
import getUnexpectedError from "../../../shared/utils/getUnexpectedError";
import { LoginModel } from "./login_model";
import loginProvider from "./login_provider";

export class LoginController {
  isLoggingIn = false;
  failureOrUser: LoginModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  onLoginButtonClicked = async (data: ILoginInputs) => {
    try {
      this.isLoggingIn = true;
      const response = await loginProvider.login(JSON.stringify(data));

      setCookie(null, "jwt", response.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: Routes.ADMIN_DASHBOARD,
      });

      Router.push(Routes.ADMIN_DASHBOARD);
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
