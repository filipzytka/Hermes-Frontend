import { SERVER_URL_EMAIL } from "./constants";
import { fetchRequest as fetchRequest } from "./helpers";

export const sendEmail = async (receiverEmail: string, body: string) => {
  await fetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL_EMAIL}`,
    body: JSON.stringify({
      receiverEmail,
      body,
    }),
  });
};
