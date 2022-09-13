import qs from "qs";

const getOrderQuery = (start: string, end: string) => {
  return qs.stringify(
    {
      populate: {
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
            delivered_date: {
              $between: [start, end],
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

export default getOrderQuery;
