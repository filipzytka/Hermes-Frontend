import { TCollaborator } from "../pages/Collaborators";
import { SERVER_URL_USERS } from "./constants";
import { FetchRequest, getCookie } from "./helpers";

export const RegisterUser = async (
  email: string,
  password: string,
  token: string
) => {
  return await FetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/register`,
    body: JSON.stringify({
      email,
      password,
      token,
    }),
  });
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

    const responseBody = await response.json();

    if (response.status == 200) {
      return {
        success: true,
        role: responseBody.role,
        email: responseBody.email,
      };
    }

    return { success: false, message: responseBody.message };
  } catch (error) {
    console.log(`Error while logging user! Error: ${error}`);

    return {
      success: false,
      message: error,
    };
  }
};

export const AuthenticateUser = async () => {
  if (!getCookie("active")) return;

  try {
    const response = await fetch(`${SERVER_URL_USERS}/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const responseBody = await response.json();

    if (response.status === 200) {
      return {
        success: true,
        role: responseBody.role,
        email: responseBody.email,
      };
    }

    return { success: false };
  } catch (error) {
    console.log(`Error while authenticating user! Error: ${error}`);

    return { success: false };
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
      return { success: true };
    }
  } catch (error) {
    console.log(`Error while authenticating user! Error: ${error}`);

    return { success: false };
  }
};

export const GetCollaborators = async () => {
  try {
    const response = await fetch(`${SERVER_URL_USERS}/collaborators`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      const responseJson = await response.json();

      return { success: true, collaborators: responseJson.collaborators };
    }
  } catch (error) {
    console.log(`Error while fetching collaborators! Error: ${error}`);

    return { success: false };
  }
};

export const DeleteUsers = async (collaborators: TCollaborator[]) => {
  try {
    const response = await fetch(`${SERVER_URL_USERS}/collaborator/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collaborators),
      credentials: "include",
    });

    if (response.status === 200) {
      return { success: true, message: `Users has been removed` };
    }
    return { success: false };
  } catch (error) {
    console.log(`Error while deleting collaborators! Error: ${error}`);

    return { success: false };
  }
};
