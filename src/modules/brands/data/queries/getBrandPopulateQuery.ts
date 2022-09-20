import qs from "qs";

const getBrandPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
        products: {
          fields: ["name"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
};

export default getBrandPopulateQuery;
