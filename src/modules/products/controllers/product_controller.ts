import { makeAutoObservable } from "mobx";
import { ErrorModel } from "../../../shared/data/models/errror_model";
import { IProductInputs } from "../../../shared/types/interfaces";
import { ProductModel } from "../data/models/product_model";
import productRepository from "../data/repositories/product_repository";

export class ProductController {
  loading = false;
  saving = false;
  deleting = false;
  product: ProductModel | null = null;
  error: ErrorModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getOne = async (id: string) => {
    this.loading = true;
    const { error, results } = await productRepository.getOne(id);
    this.error = error;
    this.product = results;
    this.loading = false;

    return { error, product: results };
  };

  update = async (
    id: string,
    isImageUpdated: boolean,
    data: IProductInputs
  ) => {
    this.saving = true;
    const { error, results } = await productRepository.update(
      id,
      isImageUpdated,
      data
    );
    this.error = error;
    this.product = results;
    this.saving = false;

    return { error, product: results };
  };

  delete = async (id: string) => {
    this.deleting = true;
    const { error, results } = await productRepository.delete(id);
    this.error = error;
    this.deleting = false;

    return { error, results };
  };
}

const productController = new ProductController();
export default productController;
