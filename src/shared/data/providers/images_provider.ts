import { IImageDetails } from "../../types/interfaces";
import http from "../../utils/http";

export class ImagesProvider {
  create = async (formData: FormData) => {
    const response = await http.post("/upload", formData);

    return response.data;
  };

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async () => {};

  update = async (id: string, formData: FormData) => {};

  delete = async (id: string) => {
    await http.delete(`/upload/files/${id}`);
  };
}

const imagesProvider = new ImagesProvider();
export default imagesProvider;
