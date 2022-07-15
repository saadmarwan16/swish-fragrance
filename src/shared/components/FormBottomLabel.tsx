import { FunctionComponent } from "react";

interface FormBottomLabelProps {
  message: string;
}

const FormBottomLabel: FunctionComponent<FormBottomLabelProps> = ({ message }) => {
  return (
    <label className="label">
      <span className="label-text-alt text-error">
        {message}
      </span>
    </label>
  );
};

export default FormBottomLabel;
