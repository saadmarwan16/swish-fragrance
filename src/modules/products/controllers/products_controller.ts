import { makeAutoObservable } from "mobx";
import { ErrorModel } from "../../../shared/data/models/errror_model";
import { IProductInputs } from "../../../shared/types/interfaces";
import { ProductsModel } from "../data/models/products_model";
import productsRepository from "../data/repositories/products_repository";

export class ProductsController {
  products: ProductsModel | null = null;
  isTableView = true;
  loading = false;
  error: ErrorModel | null = null;
  searchQuery = "";

  constructor() {
    makeAutoObservable(this);
  }

  create = async (data: IProductInputs) => {
    this.loading = true;
    const { error, results } = await productsRepository.create(data);
    this.error = error;
    this.loading = false;

    return {
      error,
      results,
    };
  };

  getMany = async (value: string, page?: number) => {
    this.searchQuery = value;
    if (value === "" && this.products !== null) {
      return { error: null, products: this.products };
    }

    this.loading = true;
    const { error, results } = await productsRepository.getMany(
      page ?? 1,
      value
    );
    this.loading = false;

    return {
      error,
      products: results,
    };
  };

  getAll = async (page?: number) => {
    this.loading = true;
    const { error, results } = await productsRepository.getAll(page ?? 1);
    this.products = results;
    this.error = error;
    this.loading = false;

    return {
      error,
      products: results,
    };
  };

  changeSearchedProductsPage = async (page: number) => {
    return await this.getMany(this.searchQuery, page);
  };

  setIsTableView = (value: boolean) => (this.isTableView = value);
}

const productsController = new ProductsController();
export default productsController;
