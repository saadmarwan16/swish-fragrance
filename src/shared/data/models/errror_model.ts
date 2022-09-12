// To parse this data:
//
//   import { Convert, ErrorModel } from "./file";
//
//   const errorModel = Convert.toErrorModel(json);

export interface ErrorModel {
  name: string;
  message: string;
}

// Converts JSON strings to/from your types
export class ConvertErrorModel {
  public static toErrorModel(json: string): ErrorModel {
    return JSON.parse(json);
  }

  public static errorModelToJson(value: ErrorModel): string {
    return JSON.stringify(value);
  }
}
