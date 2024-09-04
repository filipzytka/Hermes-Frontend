import { SERVER_URL } from "./constants";
import { fetchRequest } from "./helpers";
import {
  TCollaborator,
  TCollaboratorsResponse,
  TMessageResponse,
} from "./response-types";

export const registerUser = (email: string, password: string, token: string) =>
  fetchRequest<TMessageResponse>({
    method: "POST",
    endpoint: `${SERVER_URL}/api/users/register`,
    body: JSON.stringify({
      email,
      password,
      token,
    }),
  });

export const getCollaborators = () =>
  fetchRequest<TCollaboratorsResponse>({
    method: "GET",
    endpoint: `${SERVER_URL}/api/users/collaborators`,
  });

export const deleteUsers = (collaborators: TCollaborator[]) =>
  fetchRequest<TMessageResponse>({
    method: "DELETE",
    endpoint: `${SERVER_URL}/api/users/collaborator/remove`,
    body: JSON.stringify(collaborators),
  });
