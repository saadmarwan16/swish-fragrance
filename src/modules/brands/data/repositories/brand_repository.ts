import { serialize } from "object-to-formdata";
import { SUCCESS } from "../../../../shared/constants/strings";
import imagesRepository from "../../../../shared/data/repositories/images_repository";
import handleError from "../../../../shared/errors/handleError";
import { IBrandInputs } from "../../../../shared/types/interfaces";
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
    imageId: number | undefined,
    data: IBrandInputs
  ) => {
    try {
      let image: number | null | undefined = imageId;
      if (data.image !== null) {
        image = (
          await imagesRepository.create(serialize({ files: data.image }))
        )[0].id;
      }

      if (!image && data.image === null) {
        image = null;
      }

      const results = await brandProvider.update(
        id,
        this.getQuery(),
        JSON.stringify({
          data: {
            ...data,
            image,
          },
        })
      );

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
