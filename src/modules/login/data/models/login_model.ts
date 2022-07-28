// To parse this data:
//
//   import { Convert, LoginModel } from "./file";
//
//   const loginModel = Convert.toLoginModel(json);

export interface LoginModel {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Converts JSON strings to/from your types
export class ConvertLoginModel {
  public static toLoginModel(json: string): LoginModel {
    return JSON.parse(json);
  }

  public static loginModelToJson(value: LoginModel): string {
    return JSON.stringify(value);
  }
}
