import axios from "axios";
// import { SERVER_URL } from "./constants";

export const sendEmail = async (
  receiverEmail: string,
  topic: string,
  body: string
) => {
  await axios.post(
    `http://localhost:8080/api/email`,
    {
      receiverEmail,
      topic,
      body,
    },
    {
      withCredentials: true,
    }
  );
};
