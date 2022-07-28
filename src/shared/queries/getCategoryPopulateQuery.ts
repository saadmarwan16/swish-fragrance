import qs from "qs";

const getCategoryPopulateQuery = () => {
  const query = qs.stringify(
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

  console.log(query);
  return query;
};

export default getCategoryPopulateQuery;
