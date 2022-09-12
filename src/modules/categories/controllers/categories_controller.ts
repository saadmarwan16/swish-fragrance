import { makeAutoObservable } from "mobx";
import { ICategoryInputs } from "../../../shared/types/interfaces";
import { CategoriesModel } from "../data/models/categories_model";
import categoriesRepository from "../data/repositories/categories_repository";

export class CategoriesController {
  categories: CategoriesModel | null = null;
  isTableView = false;
  loading = false;
  searchString = "";

  constructor() {
    makeAutoObservable(this);
  }

  create = async (data: ICategoryInputs) => {
    this.loading = true;
    const { error, results } = await categoriesRepository.create(data);
    if (!error) {
      const { error, categories } = await this.getAll();
      this.loading = false;

      return {
        error,
        categories,
      };
    }

    this.loading = false;

    return {
      error,
      categories: results,
    };
  };

  getMany = async (value: string, page?: number) => {
    this.searchString = value;
    if (value === "" && this.categories !== null) {
      return {
        error: null,
        categories: this.categories,
      };
    }

    this.loading = true;
    const { error, results } = await categoriesRepository.getMany(
      page ?? 1,
      value
    );
    this.loading = false;

    return {
      error,
      categories: results,
    };
  };

  getAll = async (page?: number) => {
    this.loading = true;
    const { error, results } = await categoriesRepository.getAll(page ?? 1);
    this.categories = results;
    this.loading = false;

    return {
      error,
      categories: results,
    };
  };

  changeSearchedCategoriesPage = async (page: number) => {
    return await this.getMany(this.searchString, page);
  };

  setIsTableView = (value: boolean) => (this.isTableView = value);
}

const categoriesController = new CategoriesController();
export default categoriesController;
