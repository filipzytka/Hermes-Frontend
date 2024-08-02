import toast from "react-hot-toast";

type PopUp = "success" | "error";

export const popUp = (response: string, status: PopUp) => {
  if (status == "success") toast.success(response);
  else if (status == "error") toast.error(response);
};
