import { makeAutoObservable } from "mobx";
import { CategoriesModel } from "./categories_model";
import categoriesProvider from "./categories_provider";

export class CategoriesController {
  categories: CategoriesModel | null = null;
  isTableView = false;
  loading = false;
  searchQuery = "";

  constructor() {
    makeAutoObservable(this);
  }

  newCategory = async (name: string) => {
    await categoriesProvider.newCategory(name);
    return await this.getCategories();
  };

  updateCategory = async (id: number, name: string) => {
    await categoriesProvider.updateCategory(id, name);
    return await this.getCategory(id.toString());
  };

  getCategory = async (id: string) => {
    try {
      const category = await categoriesProvider.getCategory(id);

      return category;
    } catch (_) {
      return null;
    }
  };

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
