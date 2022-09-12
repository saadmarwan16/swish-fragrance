import { FunctionComponent } from "react";

interface ConfirmDeleteModalProps {
  id: string;
}

const ConfirmDeleteModal: FunctionComponent<ConfirmDeleteModalProps> = ({
  id,
}) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label
            htmlFor={id}
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Delete brand
          </h3>
          <p className="py-4">
            Are you sure you want to delete this
          </p>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
