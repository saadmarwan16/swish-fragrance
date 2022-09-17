import { FunctionComponent } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import InputField from "../../../shared/components/InputField";
import SelectField from "../../../shared/components/SelectField";
import { INewProductInputs } from "../../../shared/types/interfaces";
import getProductSizeOptions from "../../../shared/utils/getProductSizeOptions";

interface NewProductInputsProps {
  register: UseFormRegister<INewProductInputs>;
  errors: FieldErrorsImpl<DeepRequired<INewProductInputs>>;
}

const NewProductInputs: FunctionComponent<NewProductInputsProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="new-product-layout">
        <InputField
          isRequired={true}
          error={errors.name}
          label="Product name"
          placeholder="Enter product name here"
          register={register("name")}
        />
        <SelectField
          error={errors.size}
          label="Size"
          register={register("size")}
          isRequired={true}
          disableText="Choose a size"
          productSizeOptions={getProductSizeOptions()}
        />
      </div>
      <div className="new-product-layout">
        <InputField
          isRequired={true}
          label="Cost Price"
          placeholder="Enter cost price here"
          error={errors.cost_price}
          register={register("cost_price")}
          type="number"
          step={0.01}
        />
        <InputField
          isRequired={true}
          label="Selling Price"
          placeholder="Enter selling price here"
          error={errors.selling_price}
          register={register("selling_price")}
          type="number"
          step={0.01}
        />
      </div>
      <div className="new-product-layout">
        <InputField
          isRequired={true}
          label="Number In Stock"
          placeholder="Enter number in stock here"
          error={errors.in_stock}
          register={register("in_stock")}
          type="number"
          step={1}
        />
        <InputField
          isRequired={true}
          label="Re-stock Point"
          placeholder="Enter re-stock point here"
          error={errors.restock_point}
          register={register("restock_point")}
          type="number"
          step={1}
        />
      </div>
      <div className="new-product-layout">
        <InputField
          isRequired={true}
          label="Number Sold"
          placeholder="Enter number sold here"
          error={errors.number_sold}
          register={register("number_sold")}
          type="number"
          step={1}
        />
        <InputField
          isRequired={true}
          label="Revenue"
          placeholder="Enter revenue generated here"
          error={errors.revenue_generated}
          register={register("revenue_generated")}
          type="number"
          step={0.01}
        />
      </div>
      <div className="new-product-layout">
        <InputField
          isRequired={true}
          label="Discount"
          placeholder="Enter discount here"
          error={errors.discount}
          register={register("discount")}
          type="number"
          step={1}
        />
        <InputField
          isRequired={true}
          label="Profit"
          placeholder="Enter profit here"
          error={errors.profit}
          register={register("profit")}
          type="number"
          step={0.01}
        />
      </div>
    </div>
  );
};

export default NewProductInputs;
