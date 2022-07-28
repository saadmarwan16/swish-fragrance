import { FunctionComponent } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import { INewProductInputs } from "../types/interfaces";
import { NewProductFieldType } from "../types/types";
import FormBottomLabel from "./FormBottomLabel";
import LabelledInput from "./LabelledInput";

interface ReactHookFormInputProps {
  register: UseFormRegister<INewProductInputs>;
  isRequired: boolean;
  topFormText: string;
  placeholder: string;
  field: NewProductFieldType;
  topFormTextSuffix?: string;
  errorMessage?: string;
  errors?: FieldErrorsImpl<DeepRequired<INewProductInputs>>;
  type?: string;
}

const ReactHookFormInput: FunctionComponent<ReactHookFormInputProps> = ({
  register,
  isRequired,
  topFormText,
  field,
  placeholder,
  topFormTextSuffix,
  errorMessage,
  errors,
  type,
}) => {
  return (
    <LabelledInput
      isRequired={isRequired}
      topFormText={topFormText}
      topFormTextSuffix={topFormTextSuffix}
    >
      <input
        type={type ?? "text"}
        className={`custom-input ${errors?.[field] && "!border-error"}`}
        placeholder={placeholder}
        {...register(field, {
          required: isRequired ? errorMessage : false,
          min: 38,
        })}
      />

      {errors?.[field] && (
        <FormBottomLabel message={errors?.[field]?.message!} />
      )}
    </LabelledInput>
  );
};

export default ReactHookFormInput;
