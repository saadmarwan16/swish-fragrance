import qs from "qs";

const getDateFilterQuery = (start: string, end: string) => {
  const query = qs.stringify(
    {
      sort: ["createdAt:desc"],
      filter: {
        createdAt: {
          $eq: "2022-07-23",
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

export default getDateFilterQuery;
