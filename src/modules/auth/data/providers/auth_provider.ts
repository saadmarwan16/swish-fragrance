import http from "../../../../shared/utils/http";
import { ConvertUserModel } from "../models/user_model";

export class AuthProvider {
  login = async (query: string, data: string) => {
    const authResponse = await http.post("/auth/local", data);
    const response = await http.get(
      `http://localhost:1337/api/users/${authResponse.data.user.id}?${query}`
    );

    return ConvertUserModel.toUserModel(
      JSON.stringify({
        ...response.data,
        jwt: authResponse.data.jwt,
      })
    );
  };

  register = async (query: string) => {};

  googleSignIn = async () => {};

  forgotPassword = async (id: string, data: string) => {};

  changePassword = async (id: string) => {};

  resetPassword = async (id: string) => {};
}

const authProvider = new AuthProvider();
export default authProvider;
