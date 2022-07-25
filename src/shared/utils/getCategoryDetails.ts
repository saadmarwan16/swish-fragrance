import { Products } from "../../modules/admin/brands/brands_model";

const getCategoryDetails = (products: Products) => {
  let sold = 0;
  let profit = 0;
  let revenue = 0;

  products.data.forEach((product) => {
    sold += product.attributes.number_sold;
    profit += product.attributes.profit;
    revenue += product.attributes.revenue_generated;
  });

  return {
    sold,
    profit,
    revenue,
  };
};

export default getCategoryDetails;
