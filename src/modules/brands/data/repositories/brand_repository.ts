import { serialize } from "object-to-formdata";
import { SUCCESS } from "../../../../shared/constants/strings";
import imagesRepository from "../../../../shared/data/repositories/images_repository";
import handleError from "../../../../shared/errors/handleError";
import { IBrandInputsTransformed } from "../../../../shared/types/interfaces";
import brandProvider from "../providers/brand_provider";
import getBrandPopulateQuery from "../queries/getBrandPopulateQuery";

export class BrandRepository {
  getOne = async (id: string) => {
    try {
      const results = await brandProvider.getOne(id, this.getQuery());

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  update = async (
    id: string,
    isImageUpdated: boolean,
    data: IBrandInputsTransformed
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

        results = await brandProvider.update(
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
        let transformedData: any = data
        delete transformedData['image']
        
        results = await brandProvider.update(
          id,
          this.getQuery(),
          JSON.stringify({
            data: {
              ...transformedData,
            },
          })
        );
      }

      return { error: null, results };
    } catch (err) {
      return handleError(err);
    }
  };

  delete = async (id: string) => {
    try {
      await brandProvider.delete(id);

      return { error: null, results: SUCCESS };
    } catch (err) {
      return handleError(err);
    }
  };

  getQuery = () => {
    return getBrandPopulateQuery();
  };
}

const brandRepository = new BrandRepository();
export default brandRepository;
