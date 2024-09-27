import { TBanResponse, TMessageResponse } from "./response-types";
import { axiosInstance } from "./axios";

export type BannedPlayer = {
  token: string;
  ip: string;
};

export const getBannedPlayers = async () => {
  const { data } = await axiosInstance.get<TBanResponse[]>(`/ban/players`);
  return data;
};

export const updateBannedPlayers = async (players: BannedPlayer[]) => {
  const { data } = await axiosInstance.post<TMessageResponse>(
    `/ban/players`,
    players
  );

  return data;
};
