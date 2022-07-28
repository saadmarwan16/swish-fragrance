import { makeAutoObservable } from "mobx";
import imagesRepository from "../data/repositories/images_repository";

export class ImagesController {
  constructor() {
    makeAutoObservable(this);
  }

  create = async (formData: FormData) => {
    return imagesRepository.create(formData);
  };

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async () => {};

  update = async (id: string, formData: FormData) => {
    return imagesRepository.update(id, formData);
  };

  delete = async (id: string) => {
    return imagesRepository.delete(id);
  };
}

const imagesController = new ImagesController();
export default imagesController;
