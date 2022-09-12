import { makeAutoObservable } from "mobx";
import { CategoryModel } from "../data/models/category_model";
import categoryRepository from "../data/repositories/category_repository";

export class CategoryController {
  category: CategoryModel | null = null;
  loading = false;
  constructor() {
    makeAutoObservable(this);
  }

  // updateCategory = async (id: number, name: string) => {
  //   await categoriesProvider.updateCategory(id, name);
  //   return await this.getCategory(id.toString());
  // };

  // getCategory = async (id: string) => {
  //   try {
  //     const category = await categoriesProvider.getCategory(id);

  //     return category;
  //   } catch (_) {
  //     return null;
  //   }
  // };

  getOne = async (id: string) => {
    this.loading = true;
    const { error, results } = await categoryRepository.getOne(id);
    this.category = results;
    this.loading = false;

    return {
      error,
      category: results,
    };
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};
}

const categoryController = new CategoryController();
export default categoryController;
