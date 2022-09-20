import { makeAutoObservable } from "mobx";
import { ILoginInputs } from "../../../shared/types/interfaces";
import authRepository from "../data/repositories/auth_repository";

export class AuthController {
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (data: ILoginInputs) => {
    this.loading = true;
    const results = await authRepository.login(data);
    this.loading = false;

    return results;
  };

  register = async (query: string) => {};

  googleSignIn = async () => {};

  forgotPassword = async (id: string, data: string) => {};

  changePassword = async (id: string) => {};

  resetPassword = async (id: string) => {};
}

const authController = new AuthController();
export default authController;
