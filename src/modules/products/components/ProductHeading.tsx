import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import SizedDeleteButton from "../../../shared/components/SizedDeleteButton";
import SizedSaveButton from "../../../shared/components/SizedSaveButton";
import Routes from "../../../shared/constants/routes";
import { SUCCESS } from "../../../shared/constants/strings";
import errorToast from "../../../shared/utils/errorToast";
import productController from "../controllers/product_controller";
import { ProductModel } from "../data/models/product_model";

interface ProductHeadingProps {
  product: ProductModel;
  isDirty: boolean;
}

const ProductHeading: FunctionComponent<ProductHeadingProps> = ({
  isDirty,
  product,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-6 pt-4 mb-3 md:flex-row md:items-center md:mb-4 lg:flex-col xl:flex-row lg:items-start xl:items-center">
      <div className="flex flex-col gap-3 sm:flex-row">
        <p className="custom-heading1">{product.data.attributes.name}</p>

        <div className="tabs">
          <a className="tab tab-bordered">Weekly</a>
          <a className="tab tab-bordered tab-active">Monthly</a>
          <a className="tab tab-bordered">Yearly</a>
        </div>
      </div>

      <div className="flex gap-3">
        <SizedDeleteButton
          loading={productController.deleting}
          onClick={() => {
            productController.delete(product.data.id.toString()).then((res) => {
              const { error, results } = res;
              if (error) {
                errorToast(error.name, error.message);

                return;
              }

              if (results === SUCCESS) {
                router.push(Routes.PRODUCTS);
              }
            });
          }}
        />

        <SizedSaveButton
          isLoading={productController.saving}
          title="Save"
          isDisabled={!isDirty}
        />
      </div>
    </div>
  );
};

export default observer(ProductHeading);
