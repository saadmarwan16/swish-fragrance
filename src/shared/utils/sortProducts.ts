import { IProductSizeOption } from "../types/interfaces";

const sortProducts = (a: IProductSizeOption, b: IProductSizeOption) => {
  if (a.text.toLowerCase() < b.text.toLowerCase()) {
    return -1;
  }
  if (a.text.toLowerCase() > b.text.toLowerCase()) {
    return 1;
  }
  return 0;
};

export default sortProducts;
