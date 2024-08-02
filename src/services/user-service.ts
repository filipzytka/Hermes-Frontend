import { SERVER_URL_USERS } from "./constants";
import { getCookie } from "./helpers";

export const RegisterUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${SERVER_URL_USERS}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    const responseBody = await response.json();

    if (response.status == 200) {
      return { success: true, message2: responseBody };
    }

    return { success: false, error: responseBody };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

export const LoginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${SERVER_URL_USERS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    if (response.status == 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(`Error while logging user! Error: ${error}`);

    return false;
  }
};

export const AuthenticateUser = async () => {
  if (!getCookie("active")) return false;

  try {
    const response = await fetch(`${SERVER_URL_USERS}/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(`Error while authenticating user! Error: ${error}`);

    return false;
  }
};

export const LogOutUser = async () => {
  try {
    const response = await fetch(`${SERVER_URL_USERS}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(`Error while authenticating user! Error: ${error}`);

    return false;
  }
};
