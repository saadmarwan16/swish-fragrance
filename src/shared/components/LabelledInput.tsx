import { FunctionComponent, ReactNode } from "react";
import FormBottomLabel from "./FormBottomLabel";
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

      {/* {errors.identifier && (
        <FormBottomLabel message={errors.identifier.message!} />
      )} */}
    </div>
  );
};

export default LabelledInput;
