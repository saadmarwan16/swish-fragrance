// To parse this data:
//
//   import { Convert, LoginErrorModel } from "./file";
//
//   const loginErrorModel = Convert.toLoginErrorModel(json);

export interface LoginErrorModel {
  data: null;
  error: LoginErrorModelError;
}

export interface LoginErrorModelError {
  status: number;
  name: string;
  message: string;
  details: Details;
}

export interface Details {
  errors: ErrorElement[];
}

export interface ErrorElement {
  path: string[];
  message: string;
  name: string;
}

// Converts JSON strings to/from your types
export class ConvertLoginErrorModel {
  public static toLoginErrorModel(json: string): LoginErrorModel {
    return JSON.parse(json);
  }

  public static loginErrorModelToJson(value: LoginErrorModel): string {
    return JSON.stringify(value);
  }
}
