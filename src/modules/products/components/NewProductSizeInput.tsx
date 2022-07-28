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
    <LabelledInput isRequired={true} topFormText="Size">
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

      {error && <FormBottomLabel message={error.message} />}
    </LabelledInput>
  );
};

export default NewProductSizeInput;
