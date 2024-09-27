import { axiosInstance } from "./axios";

export const sendEmail = async (
  receiverEmail: string,
  topic: string,
  body: string
) => {
  await axiosInstance.post(`/email`, {
    receiverEmail,
    topic,
    body,
  });
};
