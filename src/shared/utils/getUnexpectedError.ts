import { UnexpectedLoginError } from "../types/interfaces";

const getUnexpectedError = (): UnexpectedLoginError => {
  return { name: "UnexpectedError", message: "An unexpected error occured" };
};

export default getUnexpectedError;
