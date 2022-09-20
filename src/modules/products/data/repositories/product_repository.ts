import { serialize } from "object-to-formdata";
import { SUCCESS } from "../../../../shared/constants/strings";
import imagesRepository from "../../../../shared/data/repositories/images_repository";
import handleError from "../../../../shared/errors/handleError";
import { IProductInputs } from "../../../../shared/types/interfaces";
import productProvider from "../providers/product_provider";
import getProductQuery from "../queries/get_product_query";

export class ProductRepository {
  getOne = async (id: string) => {
    try {
      const results = await productProvider.getOne(id, this.getQuery());

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  update = async (
    id: string,
    isImageUpdated: boolean,
    data: IProductInputs
  ) => {
    try {
      let results;
      if (isImageUpdated) {
        let image;
        if (data.image) {
          image = (
            await imagesRepository.create(serialize({ files: data.image }))
          )[0].id;
        } else {
          image = null;
        }

        results = await productProvider.update(
          id,
          this.getQuery(),
          JSON.stringify({
            data: {
              ...data,
              image,
            },
          })
        );
      } else {
        let transformedData: any = data;
        delete transformedData["image"];

        results = await productProvider.update(
          id,
          this.getQuery(),
          JSON.stringify({ data: transformedData })
        );
      }

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  delete = async (id: string) => {
    try {
      await productProvider.delete(id);

      return { error: null, results: SUCCESS };
    } catch (err) {
      return handleError(err);
    }
  };

  getQuery = () => {
    return getProductQuery();
  };
}

const productRepository = new ProductRepository();
export default productRepository;
