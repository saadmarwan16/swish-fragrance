import { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import PasswordVisibilityButton from "./PasswordVisibilityButton";

interface PasswordInputGroupFieldProps {
  label: string;
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  type?: string;
  isRequired?: boolean;
  step?: number;
  state: boolean;
  toggleState: () => void;
}

const PasswordInputGroupField: FunctionComponent<PasswordInputGroupFieldProps> = ({
  label,
  placeholder,
  error,
  register,
  type,
  isRequired,
  step,
  state,
  toggleState,
}) => {
  return (
    <div className="w-full form-control">
      <label className="label">
        <span className="font-semibold label-text">
          {label} {isRequired && <span className="text-error">*</span>}
        </span>
      </label>

      <div className="custom-input-group">
        <input
          type={state ? "text" : "password"}
          placeholder={placeholder}
          min="0"
          step={step ?? 1}
          className={`custom-input ${error?.message && "!border-error"}`}
          {...register}
        />
        <PasswordVisibilityButton
          isPasswordVisible={state}
          togglePasswordVisibility={toggleState}
        />
      </div>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
};

export default PasswordInputGroupField;
