import { FunctionComponent, ReactNode } from "react";
import FormTopLabel from "./FormTopLabel";

interface LabelledInputProps {
  children: ReactNode;
  topFormText: string;
  topFormTextSuffix?: string;
  isRequired: boolean;
}

const LabelledInput: FunctionComponent<LabelledInputProps> = ({
  children,
  topFormText,
  isRequired,
  topFormTextSuffix,
}) => {
  return (
    <div className="w-full form-control">
      <FormTopLabel
        content={
          <>
            {topFormText}
            {isRequired && <span className="text-error">*</span>}
            {topFormTextSuffix && topFormTextSuffix}
          </>
        }
      />
      {children}
    </div>
  );
};

export default LabelledInput;
