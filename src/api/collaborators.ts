import {
  TCollaborator,
  TCollaboratorsResponse,
  TMessageResponse,
} from "./response-types";
import { axiosInstance } from "./axios";

export const getCollaborators = async () => {
  const { data } = await axiosInstance.get<TCollaboratorsResponse>(
    `/users/collaborators`
  );

  return data;
};

export const deleteCollaborators = async (usersToDelete: TCollaborator[]) => {
  const { data } = await axiosInstance.delete<TMessageResponse>(
    `/users/collaborators`,
    {
      data: usersToDelete,
    }
  );

  return data;
};
