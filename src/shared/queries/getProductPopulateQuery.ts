import qs from "qs";

const getProductPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        meta: {
          populate: "*",
        },
        image: {
          fields: ["url"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
};

export default getProductPopulateQuery;
