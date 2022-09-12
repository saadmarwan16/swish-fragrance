import { makeAutoObservable } from "mobx";
import { ErrorModel } from "../../../shared/data/models/errror_model";
import { IBrandInputs } from "../../../shared/types/interfaces";
import { BrandModel } from "../data/models/brand_model";
import brandRepository from "../data/repositories/brand_repository";

export class BrandController {
  brand: BrandModel | null = null;
  error: ErrorModel | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getOne = async (id: string) => {
    this.loading = true;
    const { error, results } = await brandRepository.getOne(id);
    this.error = error;
    this.brand = results;
    this.loading = false;

    return {
      error,
      brand: results,
    };
  };

  update = async (id: string, data: IBrandInputs) => {
    this.loading = true;
    const { error, results } = await brandRepository.update(id, data);
    this.error = error;
    this.brand = results;
    this.loading = false;

    return {
      error,
      brand: results,
    };
  };

  delete = async (id: string) => {
    this.loading = true;
    const { error, results } = await brandRepository.delete(id);
    this.error = error;
    this.loading = false;

    return {
      error,
      results,
    };
  };
}

const brandController = new BrandController();
export default brandController;
