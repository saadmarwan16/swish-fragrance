import { ErrorModel } from "../data/models/errror_model";

const getUnexpectedError = (): ErrorModel => {
  return { name: "UnexpectedError", message: "An unexpected error occured" };
};

export default getUnexpectedError;
