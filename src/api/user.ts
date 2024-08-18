import { TCollaborator } from "../pages/Collaborators";
import { SERVER_URL_USERS } from "./constants";
import { fetchRequest, getCookie } from "./helpers";
import {
  TAuthResponse,
  TCollaboratorsResponse,
  TMessageResponse,
} from "./response-types";

export const registerUser = (
  email: string,
  password: string,
  token: string
) => {
  return fetchRequest<TMessageResponse>({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/register`,
    body: JSON.stringify({
      email,
      password,
      token,
    }),
  });
};

export const loginUser = (email: string, password: string) => {
  return fetchRequest<TAuthResponse>({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/login`,
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const authenticateUser = () => {
  if (!getCookie("active")) return;
  return fetchRequest<TAuthResponse>({
    method: "GET",
    endpoint: `${SERVER_URL_USERS}/auth`,
  });
};

export const logOutUser = () => {
  return fetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/logout`,
  });
};

export const getCollaborators = () => {
  return fetchRequest<TCollaboratorsResponse>({
    method: "GET",
    endpoint: `${SERVER_URL_USERS}/collaborators`,
  });
};

export const deleteUsers = (collaborators: TCollaborator[]) => {
  return fetchRequest<TMessageResponse>({
    method: "DELETE",
    endpoint: `${SERVER_URL_USERS}/collaborator/remove`,
    body: JSON.stringify(collaborators),
  });
};
