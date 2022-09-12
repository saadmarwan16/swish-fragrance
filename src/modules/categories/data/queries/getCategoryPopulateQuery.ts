import qs from "qs";

const getCategoryPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        meta: {
          populate: "*",
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

export default getCategoryPopulateQuery;
