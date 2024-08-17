import {
  SERVER_URL_GENERATE_TOKEN,
  SERVER_URL_TOKEN_USE,
  SERVER_URL_VALIDATE_TOKEN,
} from "./constants";

export const generateToken = async (createdBy: string) => {
  try {
    const response = await fetch(`${SERVER_URL_GENERATE_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy,
      }),
      credentials: "include",
    });

    const responseBody = await response.json();

    if (response.status == 200) {
      return {
        success: true,
        token: responseBody.token,
        createdBy: responseBody.createdBy,
      };
    }

    return { success: false };
  } catch (error) {
    console.log(`Error while generating a token! Error: ${error}`);

    return { success: false };
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await fetch(
      `${SERVER_URL_VALIDATE_TOKEN}?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
        credentials: "include",
      }
    );

    const responseBody = await response.json();

    if (response.status == 200) {
      return { success: true, createdBy: responseBody.createdBy };
    }

    return { success: false };
  } catch (error) {
    console.log(`Error while validating a token! Error: ${error}`);

    return { success: false };
  }
};

export const useToken = async (token: string) => {
  try {
    const response = await fetch(`${SERVER_URL_TOKEN_USE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
      credentials: "include",
    });

    if (response.status == 200) {
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.log(`Error while using a token! Error: ${error}`);

    return { success: false };
  }
};
