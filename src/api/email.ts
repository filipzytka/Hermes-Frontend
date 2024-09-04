import { SERVER_URL } from "./constants";
import { fetchRequest as fetchRequest } from "./helpers";

export const sendEmail = (receiverEmail: string, body: string) =>
  fetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL}/api/email/`,
    body: JSON.stringify({
      receiverEmail,
      body,
    }),
  });
