import handleError from "../../../../shared/errors/handleError";
import categoryProvider from "../providers/category_provider";
import getCategoryPopulateQuery from "../queries/getCategoryPopulateQuery";

export class CategoryRepository {
  // updateCategory = async (id: number, name: string) => {
  //   await http.put(`/categories/${id}`, {
  //     data: {
  //       name,
  //     },
  //   });
  // };
  
  getOne = async (id: string) => {
    try {
      const query = getCategoryPopulateQuery();
      const results = await categoryProvider.getOne(id, query);

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
