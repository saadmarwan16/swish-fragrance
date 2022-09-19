import { SUCCESS } from "../../../../shared/constants/strings";
import handleError from "../../../../shared/errors/handleError";
import { ICategoryInputsTransformed } from "../../../../shared/types/interfaces";
import categoryProvider from "../providers/category_provider";
import getCategoryPopulateQuery from "../queries/getCategoryPopulateQuery";

export class CategoryRepository {
  getOne = async (id: string) => {
    try {
      const results = await categoryProvider.getOne(id, this.getQuery());

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  update = async (id: string, data: ICategoryInputsTransformed) => {
    try {
      const results = await categoryProvider.update(
        id,
        this.getQuery(),
        JSON.stringify({
          data,
        })
      );

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  delete = async (id: string) => {
    try {
      await categoryProvider.delete(id);

      return { error: null, results: SUCCESS };
    } catch (err) {
      return handleError(err);
    }
  };

  getQuery = () => {
    return getCategoryPopulateQuery();
  };
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
