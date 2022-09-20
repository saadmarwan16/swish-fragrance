import qs from "qs";

const getProductQuery = (start: string, end: string) => {
  return qs.stringify(
    {
      populate: {
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

export default getProductQuery;
