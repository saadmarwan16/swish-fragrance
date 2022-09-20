import qs from "qs";

const getDashboardQuery = (
  previousStart: string,
  previousEnd: string,
  currentStart: string,
  currentEnd: string
) => {
  return qs.stringify(
    {
      populate: {
        previous_orders: {
          fields: [
            "total",
            "payment_status",
            "delivered_date",
            "cost_price",
            "country",
          ],
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
              $between: [previousStart, previousEnd],
            },
          },
        },
        orders: {
          fields: [
            "total",
            "payment_status",
            "delivered_date",
            "cost_price",
            "country",
          ],
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
              $between: [currentStart, currentEnd],
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
            updatedAt: {
              $between: [currentStart, currentEnd],
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
