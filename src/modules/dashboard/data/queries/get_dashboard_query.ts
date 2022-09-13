import qs from "qs";

const getDashboardQuery = () => {
  return qs.stringify(
    {
      populate: {
        previous_orders: {
          fields: ["total", "status", "delivery_date", "cost_price", "country"],
          populate: {
            products: {
              fields: ["name"],
            },
            user: {
              fields: ["name"],
              populate: {
                image: {
                  fields: "url",
                },
              },
            },
          },
          filters: {
            createdAt: {
              $between: ["2022-07-01", "2022-09-12"],
            },
          },
        },
        orders: {
          fields: ["total", "status", "delivery_date", "cost_price", "country"],
          populate: {
            products: {
              fields: ["name"],
            },
            user: {
              fields: ["name"],
              populate: {
                image: {
                  fields: "url",
                },
              },
            },
          },
          filters: {
            createdAt: {
              $between: ["2022-07-01", "2022-09-12"],
            },
          },
        },
        products: {
          fields: ["name", "number_sold", "selling_price"],
          sort: ["number_sold:desc"],
          populate: {
            image: {
              fields: "url",
            },
          },
          filters: {
            createdAt: {
              $between: ["2022-07-01", "2022-09-12"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
};

export default getDashboardQuery;
