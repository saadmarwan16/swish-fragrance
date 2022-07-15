import { Products } from "../../modules/admin/categories/categories_model";

const getCategoryDetails = (products: Products) => {
  let numberOfProducts = 0;
  let sold = 0;
  let revenue = 0;

  products.data.forEach((product) => {
    sold += product.attributes.number_sold;
    revenue += product.attributes.revenue_generated;
    numberOfProducts += 1;
  });

  return {
    numberOfProducts,
    sold,
    revenue,
  };
};

export default getCategoryDetails;
