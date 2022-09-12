import { AxiosError } from "axios";
import { ErrorModel } from "../data/models/errror_model";
import getUnexpectedError from "../utils/getUnexpectedError";

const handleError = (err: any) => {
  if (err instanceof AxiosError) {
    const response = err.response?.data.error;

    const error = {
      name: response.name,
      message: response.message,
    } as ErrorModel;

    return {
      error,
      results: null,
    };
  }

  return { error: getUnexpectedError(), results: null };
};

export default handleError;
