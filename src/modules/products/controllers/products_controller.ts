import { makeAutoObservable } from "mobx";
import { ErrorModel } from "../../../shared/data/models/errror_model";
import { INewProductInputs } from "../../../shared/types/interfaces";
import { ProductsModel } from "../data/models/products_model";
import productsProvider from "../data/providers/products_provider";
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

  create = async (data: INewProductInputs) => {
    this.loading = true;
    const { error, results } = await productsRepository.create(data);
    this.error = error;
    this.loading = false;

    return {
      error,
      results,
    };
  };

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async () => {};

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};

  // newProduct = async (data: string) => {
  //   try {
  //     this.loading = true;
  //     await productsProvider.newProduct(data);
  //     return "success";
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   } finally {
  //     this.loading = false;
  //   }
  // };

  getProducts = async (page?: number) => {
    try {
      this.loading = true;
      const products = await productsProvider.getProducts(page ?? 1);
      this.products = products;

      return products;
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  getProductsBySearch = async (value: string, page?: number) => {
    this.searchQuery = value;
    if (value === "" && this.products !== null) {
      return this.products;
    }

    try {
      this.loading = true;
      return await productsProvider.getProducts(page ?? 1, value);
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  changeSearchedProductsPage = async (page: number) => {
    return await this.getProductsBySearch(this.searchQuery, page);
  };

  setIsTableView = (value: boolean) => (this.isTableView = value);
}

const productsController = new ProductsController();
export default productsController;
