import { makeAutoObservable } from "mobx";
import { ErrorModel } from "../../../shared/data/models/errror_model";
import { ICategoryInputsTransformed } from "../../../shared/types/interfaces";
import { CategoryModel } from "../data/models/category_model";
import categoryRepository from "../data/repositories/category_repository";

export class CategoryController {
  category: CategoryModel | null = null;
  error: ErrorModel | null = null;
  loading = false;
  saving = false;
  deleting = false;
  constructor() {
    makeAutoObservable(this);
  }

  getOne = async (id: string) => {
    this.loading = true;
    const { error, results } = await categoryRepository.getOne(id);
    this.error = error;
    this.category = results;
    this.loading = false;

    return {
      error,
      category: results,
    };
  };

  update = async (id: string, data: ICategoryInputsTransformed) => {
    this.saving = true;
    const { error, results } = await categoryRepository.update(id, data);
    this.error = error;
    this.category = results;
    this.saving = false;

    return {
      error,
      category: results,
    };
  };

  delete = async (id: string) => {
    this.deleting = true;
    const { error, results } = await categoryRepository.delete(id);
    this.error = error;
    this.deleting = false;

    return {
      error,
      results,
    };
  };
}

const categoryController = new CategoryController();
export default categoryController;
