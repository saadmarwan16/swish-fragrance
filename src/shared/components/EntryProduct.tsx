import { FunctionComponent } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { MdDelete } from "react-icons/md";

interface EntryProductProps {
    onDeleteClicked: () => void;
    register: UseFormRegisterReturn
}

const EntryProduct: FunctionComponent<EntryProductProps> = ({register, onDeleteClicked}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-full form-control">
        <input
          type={"text"}
          className="!w-full custom-input"
          disabled
          {...register}
        />
      </div>

      <button
        className="custom-primary-button !px-2 sm:px-3 sm:h-12 !w-fit"
        type={"button"}
        onClick={onDeleteClicked}
      >
        <MdDelete className="text-xl md:text-3xl sm:text-2xl" />
      </button>
    </div>
  );
};

export default EntryProduct;
