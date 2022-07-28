import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface NewProductInputProps {
  register: UseFormRegisterReturn;
  isRequired: boolean;
  topLabel: string;
  placeholder: string;
  error?: FieldError;
  type: string;
  step?: number;
}

const NewProductInput: FunctionComponent<NewProductInputProps> = ({
  register,
  isRequired,
  topLabel,
  placeholder,
  error,
  type,
  step,
}) => {
  return (
    <div className="w-full form-control">
      <label className="font-semibold label">
        <span className="label-text">
          {topLabel} {isRequired && <span className="text-error">*</span>}
        </span>
      </label>

      <input
        type={type}
        min="0"
        step={step}
        defaultValue={type === "number" ? 0 : ""}
        placeholder={placeholder}
        className={`custom-input ${error && "!border-error"}`}
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

export default NewProductInput;
