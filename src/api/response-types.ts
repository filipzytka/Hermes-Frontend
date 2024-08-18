import { TCollaborator } from "../pages/Collaborators";

export type TAuthResponse = {
  role: string;
  email: string;
  message: string;
};

export type TMessageResponse = {
  message: string;
};

export type TCollaboratorsResponse = {
  collaborators: TCollaborator[];
};

export type TTokenResponse = {
  token?: string;
  createdBy: string;
};
