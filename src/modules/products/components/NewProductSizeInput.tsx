import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import FormBottomLabel from "../../../shared/components/FormBottomLabel";
import LabelledInput from "../../../shared/components/LabelledInput";

interface NewProductSizeInputProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const NewProductSizeInput: FunctionComponent<NewProductSizeInputProps> = ({
  register,
  error,
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
        <option disabled>Choose a size</option>
        <option>15 ML</option>
        <option>30 ML</option>
        <option>50 ML</option>
        <option>100 ML</option>
      </select>

      <input
        type={type ?? "text"}
        placeholder={placeholder}
        min="0"
        step={step ?? 1}
        className={`custom-input ${error?.message && "!border-error"}`}
        {...register}
      />

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
};

export default NewProductSizeInput;
