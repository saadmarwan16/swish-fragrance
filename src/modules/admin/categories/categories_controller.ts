import { makeAutoObservable } from "mobx";
import { CategoriesModel } from "./categories_model";
import categoriesProvider from "./categories_provider";

export class CategoriesController {
  categories: CategoriesModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCategories = async () => {
    try {
      const categories = await categoriesProvider.getCategories();
      this.categories = categories;

      return categories;
    } catch (e) {
      console.log(e);
    }
  };
}

const categoriesController = new CategoriesController();
export default categoriesController;
