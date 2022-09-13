import handleError from "../../../../shared/errors/handleError";
import { ILoginInputs } from "../../../../shared/types/interfaces";
import authProvider from "../providers/auth_provider";
import getUserQuery from "../queries/get_user_query";

export class AuthRepository {
  adminLogin = async (data: string) => {};

  login = async (data: ILoginInputs) => {
    try {
      const results = await authProvider.login(
        getUserQuery(),
        JSON.stringify(data)
      );

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  register = async (query: string) => {};

  googleSignIn = async () => {};

  forgotPassword = async (id: string, data: string) => {};

  changePassword = async (id: string) => {};

  resetPassword = async (id: string) => {};
}

const authRepository = new AuthRepository();
export default authRepository;
