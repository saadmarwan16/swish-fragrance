import { serialize } from "object-to-formdata";
import { SUCCESS } from "../../../../shared/constants/strings";
import imagesRepository from "../../../../shared/data/repositories/images_repository";
import handleError from "../../../../shared/errors/handleError";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import getProductPopulateQuery from "../queries/get_product_populate_query";
import getSearchQuery from "../../../../shared/queries/getSearchQuery";
import getSortAlphabetical from "../../../../shared/queries/getSortAlphabetical";
import { IProductInputs } from "../../../../shared/types/interfaces";
import productsProvider from "../providers/products_provider";

export class ProductsRepository {
  create = async (data: IProductInputs) => {
    try {
      let res = null;

      if (data.image) {
        res = await imagesRepository.create(serialize({ files: data.image }));
      }

      await productsProvider.create(
        JSON.stringify({
          data: {
            ...data,
            image: res?.[0].id,
          },
        })
      );

      return { error: null, results: SUCCESS };
    } catch (err) {
      return handleError(err);
    }
  };

  getMany = async (page: number, searchQuery: string) => {
    try {
      const results = await productsProvider.getMany(
        this.getQuery(page, searchQuery)
      );

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  getAll = async (page: number) => {
    try {
      const results = await productsProvider.getAll(this.getQuery(page));

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  getQuery = (page: number, searchQuery?: string) => {
    let query = `${getProductPopulateQuery()}&${getPaginationQuery(
      page
    )}&${getSortAlphabetical()}`;
    if (searchQuery) {
      query = `${query}&${getSearchQuery(searchQuery)}`;
    }

    return query;
  };
}

const productsRepository = new ProductsRepository();
export default productsRepository;
