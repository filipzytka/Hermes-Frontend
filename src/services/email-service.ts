import { SERVER_URL_EMAIL } from "./constants";

export const SendEmail = async (receiverEmail: string, body: string) => {
  try {
    const response = await fetch(`${SERVER_URL_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiverEmail,
        body,
      }),
      credentials: "include",
    });
    if (response.status == 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(`Error while sending an email! Error: ${error}`);

    return false;
  }
};
