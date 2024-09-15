export type TCollaborator = {
  email: string;
};

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
  Token: string;
  Ip: string;
};

export type TServerDataResponse = {
  id: number;
  created: string;
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
  created: string;
};

export type TLogsResponse = {
  message: string;
  created: string;
};
