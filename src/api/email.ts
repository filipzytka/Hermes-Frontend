import axios from "axios";
import { SERVER_URL } from "./constants";

export const sendEmail = async (receiverEmail: string, body: string) => {
  await axios.post(
    `${SERVER_URL}/api/email`,
    {
      receiverEmail,
      body,
    },
    {
      withCredentials: true,
    }
  );
};
