import { SERVER_URL_EMAIL } from "./constants";
import { FetchRequest } from "./helpers";

export const SendEmail = async (receiverEmail: string, body: string) => {
  await FetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL_EMAIL}`,
    body: JSON.stringify({
      receiverEmail,
      body,
    }),
  });
};
