import { SUCCESS } from "../../../../shared/constants/strings";
import handleError from "../../../../shared/errors/handleError";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import getSearchQuery from "../../../../shared/queries/getSearchQuery";
import getSortAlphabetical from "../../../../shared/queries/getSortAlphabetical";
import { ICategoryInputs } from "../../../../shared/types/interfaces";
import categoriesProvider from "../providers/categories_provider";
import getCategoriesPopulateQuery from "../queries/getCategoriesPopulateQuery";

export class CategoriesRepository {
  create = async (data: ICategoryInputs) => {
    try {
      await categoriesProvider.create(JSON.stringify({ data }));

      return {
        error: null,
        results: SUCCESS,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  getMany = async (page: number, searchString: string) => {
    try {
      const query = `${getPaginationQuery(
        page
      )}&${getCategoriesPopulateQuery()}&${getSortAlphabetical()}&${getSearchQuery(
        searchString
      )}`;
      const results = await categoriesProvider.getAll(query);

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  getAll = async (page: number) => {
    try {
      const query = `${getPaginationQuery(
        page
      )}&${getCategoriesPopulateQuery()}&${getSortAlphabetical()}`;
      const results = await categoriesProvider.getAll(query);

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };
}

const categoriesRepository = new CategoriesRepository();
export default categoriesRepository;
