import { TCollaborator } from "../pages/Collaborators";
import { SERVER_URL_USERS } from "./constants";
import { fetchRequest, getCookie } from "./helpers";
import {
  TAuthResponse,
  TCollaboratorsResponse,
  TLoginResponse,
  TMessageResponse,
} from "./response-types";

export const registerUser = async (
  email: string,
  password: string,
  token: string
) => {
  return await fetchRequest<TMessageResponse>({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/register`,
    body: JSON.stringify({
      email,
      password,
      token,
    }),
  });
};

export const loginUser = async (email: string, password: string) => {
  return await fetchRequest<TLoginResponse>({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/login`,
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const authenticateUser = async () => {
  if (!getCookie("active")) return;
  return await fetchRequest<TAuthResponse>({
    method: "GET",
    endpoint: `${SERVER_URL_USERS}/auth`,
  });
};

export const logOutUser = async () => {
  return await fetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/logout`,
  });
};

export const getCollaborators = async () => {
  return await fetchRequest<TCollaboratorsResponse>({
    method: "GET",
    endpoint: `${SERVER_URL_USERS}/collaborators`,
  });
};

export const deleteUsers = async (collaborators: TCollaborator[]) => {
  return await fetchRequest<TMessageResponse>({
    method: "DELETE",
    endpoint: `${SERVER_URL_USERS}/collaborator/remove`,
    body: JSON.stringify(collaborators),
  });
};
