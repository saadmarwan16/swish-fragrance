import qs from "qs";

const getSortAlphabetical = () => {
  return qs.stringify(
    {
      sort: ["name"],
    },
    {
      encodeValuesOnly: true,
    }
  );
};

export default getSortAlphabetical;
