import qs from "qs";

const getBrandsPopulateQuery = () => {
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

export default getBrandsPopulateQuery;
