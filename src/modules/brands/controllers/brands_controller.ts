import { makeAutoObservable } from "mobx";
import { ErrorModel } from "../../../shared/data/models/errror_model";
import { IBrandInputs } from "../../../shared/types/interfaces";
import { BrandsModel } from "../data/models/brands_model";
import brandsRepository from "../data/repositories/brands_repository";

export class BrandsController {
  brands: BrandsModel | null = null;
  error: ErrorModel | null = null;
  isTableView = true;
  loading = false;
  queryString = "";

  constructor() {
    makeAutoObservable(this);
  }

  create = async (data: IBrandInputs) => {
    this.loading = true;
    const { error, results } = await brandsRepository.create(data);
    this.error = error;
    this.loading = false;

    return {
      error,
      results,
    };
  };

  getMany = async (queryString: string, page?: number) => {
    this.queryString = queryString;
    if (queryString === "" && this.brands !== null) {
      return {
        error: null,
        brands: this.brands,
      };
    }

    this.loading = true;
    const { error, results } = await brandsRepository.getMany(page ?? 1, queryString);
    this.error = error;
    this.loading = false;

    return {
      error,
      brands: results,
    };
  };

  getAll = async (page?: number) => {
    this.loading = true;
    const { error, results } = await brandsRepository.getAll(page ?? 1);
    this.brands = results;
    this.error = error;
    this.loading = false;

    return {
      error,
      brands: results,
    };
  };

  changeSearchedBrandsPage = async (page: number) => {
    return await this.getMany(this.queryString, page);
  };

  setIsTableView = (value: boolean) => (this.isTableView = value);
}

const brandsController = new BrandsController();
export default brandsController;
