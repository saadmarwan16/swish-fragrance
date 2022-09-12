import qs from "qs";

const getDateFilterQuery = (start: string, end: string) => {
  return qs.stringify(
    {
      sort: ["createdAt:desc"],
      filters: {
        createdAt: {
          $between: [start, end],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
};

export default getDateFilterQuery;
