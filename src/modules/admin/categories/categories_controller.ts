import { makeAutoObservable } from "mobx";
import { CategoriesModel } from "./categories_model";
import categoriesProvider from "./categories_provider";

export class CategoriesController {
  categories: CategoriesModel | null = null;
  isTableView = true;
  loading = false;
  searchQuery = "";

  constructor() {
    makeAutoObservable(this);
  }

  getCategories = async (page?: number) => {
    try {
      this.loading = true;
      const categories = await categoriesProvider.getCategories(page ?? 1);
      this.categories = categories;

      return categories;
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  getCategoriesBySearch = async (value: string, page?: number) => {
    this.searchQuery = value;
    if (value === "" && this.categories !== null) {
      return this.categories;
    }

    try {
      this.loading = true;
      return await categoriesProvider.getCategories(page ?? 1, value);
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  changeSearchedCategoriesPage = async (page: number) => {
    return await this.getCategoriesBySearch(this.searchQuery, page);
  };

  setIsTableView = (value: boolean) => (this.isTableView = value);
}

const categoriesController = new CategoriesController();
export default categoriesController;
