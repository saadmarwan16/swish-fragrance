import { FunctionComponent } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import InputField from "../../../shared/components/InputField";
import { IProductInputs } from "../../../shared/types/interfaces";

interface ProductInputsProps {
  register: UseFormRegister<IProductInputs>;
  errors: FieldErrorsImpl<DeepRequired<IProductInputs>>;
}

const ProductInputs: FunctionComponent<ProductInputsProps> = ({
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
        <InputField
          isRequired={true}
          label="Discount"
          placeholder="Enter discount here"
          error={errors.discount}
          register={register("discount")}
          type="number"
          step={1}
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
    </div>
  );
};

export default ProductInputs;
