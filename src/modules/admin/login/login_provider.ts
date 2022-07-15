import {
  ConvertLoginErrorModel,
  LoginErrorModel,
} from "../../../shared/errors/login_error_model";
import http from "../../../shared/utils/http";
import { ConvertLoginModel } from "./login_model";

export class LoginProvider {
  async login(data: string) {
    const response = await http.post("/auth/local", data);

    return ConvertLoginModel.toLoginModel(JSON.stringify(response.data));
  }
}

const loginProvider = new LoginProvider();
export default loginProvider;
