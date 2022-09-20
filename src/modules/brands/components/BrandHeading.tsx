import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import SizedDeleteButton from "../../../shared/components/SizedDeleteButton";
import SizedSaveButton from "../../../shared/components/SizedSaveButton";
import Routes from "../../../shared/constants/routes";
import errorToast from "../../../shared/utils/errorToast";
import brandController from "../controllers/brand_controller";
import { BrandModel } from "../data/models/brand_model";

interface BrandHeadingProps {
  brand: BrandModel;
  isDirty: boolean;
}

const BrandHeading: FunctionComponent<BrandHeadingProps> = ({
  brand,
  isDirty,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
      <div>
        <p className="custom-heading1">{brand.data.attributes.entity.name}</p>

        <p className="custom-subtitle1">
          {brand.data.attributes.entity.products.length} product(s) found
        </p>
      </div>

      <div className="flex gap-3">
        <SizedDeleteButton
          loading={brandController.deleting}
          onClick={() => {
            brandController
              .delete(brand.data.attributes.entity.id.toString())
              .then((res) => {
                const { error, results } = res;
                if (error) {
                  errorToast(error.name, error.message);

                  return;
                }

                router.push(Routes.BRANDS);
              });
          }}
        />

        <SizedSaveButton
          isLoading={brandController.saving}
          title="Save"
          isDisabled={!isDirty}
        />
      </div>
    </div>
  );
};

export default observer(BrandHeading);
