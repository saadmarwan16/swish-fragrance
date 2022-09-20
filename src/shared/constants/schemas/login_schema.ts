import { object, string } from "yup";

const loginSchema = object({
  identifier: string()
    .required("Brand name is required")
    .min(4, "Identifier must contain at least 4 characters"),
  password: string().required("Password is required"),
}).required();

export default loginSchema;
