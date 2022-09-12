import qs from "qs";

const getSearchQuery = (searchString: string) => {
  return qs.stringify(
    {
      filters: {
        name: {
          $containsi: searchString,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
};

export default getSearchQuery;
