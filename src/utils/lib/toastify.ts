import { toast, ToastOptions } from "react-toastify";
const config: ToastOptions<any> = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
export const successToast = (message: string) => {
  console.log("toastss");
  toast.success(message, config);
};
export const errorToast = (message: string) => {
  toast.error(message, config);
};
export const dismissToast = () => {
  toast.dismiss();
};
