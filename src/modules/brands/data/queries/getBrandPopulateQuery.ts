import qs from "qs";

const getBrandPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        meta: {
          populate: "*",
        },
        image: {
          fields: ["url"],
        },
        products: {
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

export default getBrandPopulateQuery;
