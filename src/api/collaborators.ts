import axios from "axios";
import {
  TCollaborator,
  TCollaboratorsResponse,
  TMessageResponse,
} from "./response-types";
import { SERVER_URL } from "./constants";

export const getCollaborators = async () => {
  const { data } = await axios.get<TCollaboratorsResponse>(
    `${SERVER_URL}/api/users/collaborators`,
    {
      withCredentials: true,
    }
  );

  return data;
};

export const deleteCollaborators = async (usersToDelete: TCollaborator[]) => {
  const { data } = await axios.delete<TMessageResponse>(
    `${SERVER_URL}/api/users/collaborator/remove`,
    {
      withCredentials: true,
      data: usersToDelete,
    }
  );

  return data;
};
