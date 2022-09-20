import { mixed, number, object, string } from "yup";

const productSchema = object({
  name: string()
    .required("Product's name is required")
    .min(4, "Product's name must contain at least 4 characters"),
  image: mixed(),
  cost_price: number().min(0, "Product's cost price cannot be negative"),
  selling_price: number().min(0, "Product's selling price cannot be negative"),
  in_stock: number()
    .min(0, "Number of products in stock cannot be negative")
    .integer("Number of products in stock must be an integer"),
  discount: number()
    .min(0, "Product discount cannot be negative")
    .integer("Product discount must be an integer"),
  restock_point: number()
    .min(0, "Products's restock point cannot be negative")
    .integer("Products's restock point must be an integer"),
}).required();

export default productSchema;
