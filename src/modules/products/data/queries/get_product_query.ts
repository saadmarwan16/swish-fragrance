import qs from "qs";

const getProductQuery = () => {
  return qs.stringify(
    {
      populate: {
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

export default getProductQuery;
