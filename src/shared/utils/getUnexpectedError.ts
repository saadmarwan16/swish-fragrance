import { UnexpectedLoginError } from "../errors/errors";

const getUnexpectedError = (): UnexpectedLoginError => {
  return { name: "UnexpectedError", message: "An unexpected error occured" };
};

export default getUnexpectedError;
