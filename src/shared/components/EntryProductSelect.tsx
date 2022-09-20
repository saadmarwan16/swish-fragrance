import { FunctionComponent } from "react";
import { IProductSizeOption } from "../types/interfaces";

interface EntryProductSelectProps {
    selectValueChanged: (e: any) => void;
    allProducts: IProductSizeOption[]
}

const EntryProductSelect: FunctionComponent<EntryProductSelectProps> = ({allProducts, selectValueChanged}) => {
  return (
    <div className="w-full form-control">
      <label className="label">
        <span className="font-semibold label-text">Add product to brand</span>
      </label>

      <select
        className="custom-select"
        value="disabled"
        onChange={selectValueChanged}
      >
        <option value="disabled" disabled>
          Choose a product
        </option>
        {allProducts.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EntryProductSelect;
