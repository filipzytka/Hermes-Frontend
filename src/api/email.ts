import { SERVER_URL_EMAIL } from "./constants";
import { fetchRequest as fetchRequest } from "./helpers";

export const sendEmail = (receiverEmail: string, body: string) =>
  fetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL_EMAIL}`,
    body: JSON.stringify({
      receiverEmail,
      body,
    }),
  });
