import { serialize } from "object-to-formdata";
import { SUCCESS } from "../../../../shared/constants/strings";
import imagesRepository from "../../../../shared/data/repositories/images_repository";
import handleError from "../../../../shared/errors/handleError";
import { INewProductInputs } from "../../../../shared/types/interfaces";
import productsProvider from "../providers/products_provider";

export class ProductsRepository {
  create = async (data: INewProductInputs) => {
    try {
      let res = null;

      if (data.image !== null) {
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

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async () => {};

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};
}

const productsRepository = new ProductsRepository();
export default productsRepository;
