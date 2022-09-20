import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IProductSizeOption } from "../types/interfaces";

interface SelectFieldProps {
  label: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  isRequired?: boolean;
  disableText: string;
  productSizeOptions: IProductSizeOption[];
}

const SelectField: FunctionComponent<SelectFieldProps> = ({
  label,
  error,
  register,
  isRequired,
  disableText,
  productSizeOptions,
}) => {
  return (
    <div className="w-full form-control">
      <label className="label">
        <span className="font-semibold label-text">
          {label} {isRequired && <span className="text-error">*</span>}
        </span>
      </label>

      <select
        className={`custom-select ${error && "!border-error"}`}
        {...register}
      >
        <option disabled>{disableText}</option>
        {productSizeOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}

        {/* <option>15 ML</option>
        <option>30 ML</option>
        <option>50 ML</option>
        <option>100 ML</option> */}
      </select>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
};

export default SelectField;
