import { FunctionComponent } from "react";

interface FormTopLabelProps {
  content: JSX.Element;
}

const FormTopLabel: FunctionComponent<FormTopLabelProps> = ({ content }) => {
  return (
    <label className="font-semibold label">
      <span className="label-text">{content}</span>
    </label>
  );
};

export default FormTopLabel;
