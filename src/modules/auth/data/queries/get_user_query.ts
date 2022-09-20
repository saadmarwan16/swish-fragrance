import qs from "qs";

const getUserQuery = () => {
  return qs.stringify(
    {
      populate: {
        role: {
          populate: "*",
        },
        orders: {
          populate: {
            products: {
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
            image: {
              fields: ["url"],
            },
          },
        },
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

export default getUserQuery;
