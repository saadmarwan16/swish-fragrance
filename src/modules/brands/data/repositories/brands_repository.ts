import { SUCCESS } from "../../../../shared/constants/strings";
import imagesRepository from "../../../../shared/data/repositories/images_repository";
import handleError from "../../../../shared/errors/handleError";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import getSearchQuery from "../../../../shared/queries/getSearchQuery";
import getSortAlphabetical from "../../../../shared/queries/getSortAlphabetical";
import { IBrandInputs } from "../../../../shared/types/interfaces";
import brandsProvider from "../providers/brands_provider";
import getBrandsPopulateQuery from "../queries/getBrandsPopulateQuery";
import { serialize } from "object-to-formdata";

export class BrandsRepository {
  create = async (data: IBrandInputs) => {
    try {
      let res = null;
      if (data.image !== null) {
        res = await imagesRepository.create(serialize({ files: data.image }));
      }

      await brandsProvider.create(
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

  getMany = async (page: number, searchString: string) => {
    try {
      const results = await brandsProvider.getMany(
        this.getQuery(page, searchString)
      );

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  getAll = async (page: number) => {
    try {
      const results = await brandsProvider.getAll(this.getQuery(page));

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  getQuery = (page: number, searchString?: string) => {
    let query = `${getPaginationQuery(
      page
    )}&${getBrandsPopulateQuery()}&${getSortAlphabetical()}`;
    if (searchString) {
      query = `${query}&${getSearchQuery(searchString)}`;
    }

    return query;
  };
}

const brandsRepository = new BrandsRepository();
export default brandsRepository;
