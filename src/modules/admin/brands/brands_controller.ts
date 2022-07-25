import { makeAutoObservable } from "mobx";
import Router from "next/router";
import Routes from "../../../shared/constants/routes";
import { INewBrandInputs } from "../../../shared/types/interfaces";
import { BrandsModel } from "./brands_model";
import brandsProvider from "./brands_provider";

export class BrandsController {
  brands: BrandsModel | null = null;
  isTableView = true;
  loading = false;
  searchQuery = "";

  constructor() {
    makeAutoObservable(this);
  }

  newBrand = async (data: INewBrandInputs) => {
    try {
      await brandsProvider.newBrand(data);
      
      return "success";
    } catch (_) {
      return null;
    }
  };

  getBrands = async (page?: number) => {
    try {
      this.loading = true;
      const brands = await brandsProvider.getBrands(page ?? 1);
      this.brands = brands;

      return brands;
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  getBrandsBySearch = async (value: string, page?: number) => {
    this.searchQuery = value;
    if (value === "" && this.brands !== null) {
      return this.brands;
    }

    try {
      this.loading = true;
      return await brandsProvider.getBrands(page ?? 1, value);
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  changeSearchedBrandsPage = async (page: number) => {
    return await this.getBrandsBySearch(this.searchQuery, page);
  };

  setIsTableView = (value: boolean) => (this.isTableView = value);
}

const brandsController = new BrandsController();
export default brandsController;
