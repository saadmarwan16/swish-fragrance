import qs from "qs";

const getPaginationQuery = (page: number) => {
  return qs.stringify(
    {
      pagination: {
        page: page,
        pageSize: 12,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
};

export default getPaginationQuery;
