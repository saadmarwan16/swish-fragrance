import { makeAutoObservable } from "mobx";
import { ProductsModel } from "./products_model";
import productsProvider from "./products_provider";

export class ProductsController {
  products: ProductsModel | null = null;
  isTableView = true;
  loading = false;
  searchQuery = "";

  constructor() {
    makeAutoObservable(this);
  }

  newProduct = async (data: string) => {
    try {
      await productsProvider.newProduct(data);
      return "success";
    } catch (_) {
      return null;
    }
  };

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
