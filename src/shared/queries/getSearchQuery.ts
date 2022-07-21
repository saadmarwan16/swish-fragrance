import qs from "qs";

const getSearchQuery = (page: number, searchQuery: string) => {
  return qs.stringify(
    {
      pagination: {
        page: page,
        pageSize: 1,
      },
      filters: {
        name: {
          $containsi: searchQuery,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
};

export default getSearchQuery;
