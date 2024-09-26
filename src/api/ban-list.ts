import axios from "axios";
import { SERVER_URL } from "./constants";
import { TBanResponse, TMessageResponse } from "./response-types";

export type BannedPlayer = {
  token: string;
  ip: string;
};

export const getBannedPlayers = async () => {
  const { data } = await axios.get<TBanResponse[]>(
    `${SERVER_URL}/api/ban/players`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const updateBannedPlayers = async (players: BannedPlayer[]) => {
  const { data } = await axios.post<TMessageResponse>(
    `${SERVER_URL}/api/ban/players`,
    players,
    {
      withCredentials: true,
    }
  );

  return data;
};
