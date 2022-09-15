import { object, string, mixed } from "yup";

const newBrandSchema = object({
  name: string()
    .required("Brand name is required")
    .min(4, "Brand name must contain at least 4 characters"),
  image: mixed(),
}).required();

export default newBrandSchema;
