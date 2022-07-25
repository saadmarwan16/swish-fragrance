import qs from "qs";

const getOrderPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        meta: {
          populate: "*",
        },
        user: {
          fields: ["name", "username", "number", "email"],
          populate: {
            image: {
              fields: ["url"],
            },
          },
        },
        products: {
          fields: ["name", "selling_price"],
          populate: {
            image: {
              fields: ["url"],
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

export default getOrderPopulateQuery;
