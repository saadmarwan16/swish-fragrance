import qs from "qs";

const getCategoriesPopulateQuery = () => {
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

export default getCategoriesPopulateQuery;
