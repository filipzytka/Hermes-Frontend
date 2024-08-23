import { TCollaborator } from "../pages/Collaborators";
import { SERVER_URL_USERS } from "./constants";
import { fetchRequest } from "./helpers";
import { TCollaboratorsResponse, TMessageResponse } from "./response-types";

export const registerUser = (email: string, password: string, token: string) =>
  fetchRequest<TMessageResponse>({
    method: "POST",
    endpoint: `${SERVER_URL_USERS}/register`,
    body: JSON.stringify({
      email,
      password,
      token,
    }),
  });

export const getCollaborators = () =>
  fetchRequest<TCollaboratorsResponse>({
    method: "GET",
    endpoint: `${SERVER_URL_USERS}/collaborators`,
  });

export const deleteUsers = (collaborators: TCollaborator[]) =>
  fetchRequest<TMessageResponse>({
    method: "DELETE",
    endpoint: `${SERVER_URL_USERS}/collaborator/remove`,
    body: JSON.stringify(collaborators),
  });
