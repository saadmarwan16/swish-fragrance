import { toast } from "react-toastify";

const errorToast = (name: string, message: string) => {
  toast.error(
    <div>
      <p className="leading-4">{name}</p>
      <p className="text-2xs">{message}</p>
    </div>,
    {
      toastId: "login-error",
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );
};

export default errorToast;
