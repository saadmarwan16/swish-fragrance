import { IProductSizeOption } from "../types/interfaces";

const getProductSizeOptions = () => {
  const productSizeOptions: IProductSizeOption[] = [
    {
      text: "15 ML",
      value: "15",
    },
    {
      text: "30 ML",
      value: "30 ML",
    },
    {
      text: "50 ML",
      value: "50 ML",
    },
    {
      text: "100 ML",
      value: "100 ML",
    },
  ];

  return productSizeOptions;
};

export default getProductSizeOptions;
