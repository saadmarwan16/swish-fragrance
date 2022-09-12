import { toast } from "react-toastify";

const successToast = (name: string, message: string) => {
  toast.success(
    <div>
      <p className="font-semibold leading-4">{name}</p>
      <p className="text-2xs">{message}</p>
    </div>,
    {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: { color: "#111111" },
    }
  );
};

export default successToast;
