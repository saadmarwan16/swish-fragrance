import qs from "qs";

const getOrdersStatusFilterQuery = (filter: string) => {
  if (filter === "All") {
    return qs.stringify(
      {
        filters: {
          status: {},
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
  } else {
    return qs.stringify(
      {
        filters: {
          status: {
            $eq: filter,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
  }
};

export default getOrdersStatusFilterQuery;
