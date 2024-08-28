import { BannedPlayer } from "../pages/Ban";
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

export type TBanResponse = {
  players: BannedPlayer[];
};

export type TServerDataResponse = {
  players: number;
  serverName: string;
  gameMode: string;
  public: boolean;
  port: number;
  serverType: string;
  hasPassword: boolean;
  world: string;
  version: string;
  preloadUrl: string;
};

export type TServerDataChartResponse = {
  players: number;
  date: string;
};
