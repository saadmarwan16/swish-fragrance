import getBrandPopulateQuery from "../../../shared/queries/getBrandPopulateQuery";
import getPaginationQuery from "../../../shared/queries/getPaginationQuery";
import getSearchQuery from "../../../shared/queries/getSearchQuery";
import { INewBrandInputs } from "../../../shared/types/interfaces";
import http from "../../../shared/utils/http";
import { ConvertBrandsModel } from "./brands_model";

export class BrandsProvider {
  async getBrands(page: number, searchQuery?: string) {
    if (!searchQuery) {
      const response = await http.get(
        `/brands?${getPaginationQuery(page)}&${getBrandPopulateQuery()}`
      );

      return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
    } else {
      const response = await http.get(
        `/brands?${getSearchQuery(page, searchQuery)}&${getBrandPopulateQuery()}`
      );

      return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
    }
  }

  newBrand = async (data: INewBrandInputs) => {
    // const uploadImage = async (image: FileList) => {
    //   http
    //     .post("/upload", image.item(0))
    //     .then((response) => {
    //       const imageId = response.data[0].id;
    //       console.log(response);
    //       console.log(imageId);

    //       http
    //         .post("http://localhost:1337/people", { image: imageId })
    //         .then((response) => {
    //           //handle success
    //         })
    //         .catch((error) => {
    //           //handle error
    //         });
    //     })
    //     .catch((error) => {
    //       //handle error
    //     });
    // };

    const formData = new FormData();
    formData.append("files", data.image[0]);
    const imageUploadResponse = await http.post("/upload", formData);
    console.log(imageUploadResponse);
    console.log(imageUploadResponse.data[0].id);
    await http.post("/brands", {
      data: {
        image: imageUploadResponse.data[0].id,
        name: data.name,
      },
    });
  };
}

const brandsProvider = new BrandsProvider();
export default brandsProvider;
