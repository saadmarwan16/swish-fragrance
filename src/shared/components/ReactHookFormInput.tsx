import { FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";
import { NewProductInputs } from "../types/interfaces";
import { NewProductFieldType } from "../types/types";
import LabelledInput from "./LabelledInput";

interface ReactHookFormInputProps {
  register: UseFormRegister<NewProductInputs>;
  isRequired: boolean;
  topFormText: string;
  placeholder: string;
  field: NewProductFieldType;
  topFormTextSuffix?: string;
}

const ReactHookFormInput: FunctionComponent<ReactHookFormInputProps> = ({
  register,
  isRequired,
  topFormText,
  field,
  placeholder,
  topFormTextSuffix,
}) => {
  return (
    <LabelledInput isRequired={isRequired} topFormText={topFormText} topFormTextSuffix={topFormTextSuffix}>
      <input
        className="custom-input"
        placeholder={placeholder}
        {...register(field)}
      />
    </LabelledInput>
  );
};

export default ReactHookFormInput;
