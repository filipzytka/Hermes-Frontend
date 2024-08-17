import { TCollaborator } from "../pages/Collaborators";

export type TAuthResponse = {
  role: string;
  email: string;
  message: string;
};

export type TRegisterResponse = {
  message: string;
};

export type TLoginResponse = {
  role: string;
  email: string;
  message?: string;
};

export type TGetCollaboratorsResponse = {
  collaborators: TCollaborator[];
};

export type TDeleteCollaboratorsResponse = {
  message: string;
};
