import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  type?: string;
  isRequired?: boolean;
  step?: number;
}

const InputField: FunctionComponent<InputFieldProps> = ({
  label,
  placeholder,
  error,
  register,
  type,
  isRequired,
  step,
}) => {
  return (
    <div className="w-full form-control">
      <label className="label">
        <span className="font-semibold label-text">
          {label} {isRequired && <span className="text-error">*</span>}
        </span>
      </label>

      <input
        type={type ?? 'text'}
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

export default InputField;
