import qs from "qs";

const getPopulateQuery = () => {
  return qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
};

export default getPopulateQuery;
