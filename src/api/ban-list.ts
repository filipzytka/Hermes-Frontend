import { SERVER_URL } from "./constants";
import { fetchRequest } from "./helpers";
import { TBanResponse, TMessageResponse } from "./response-types";

type BannedPlayer = {
  token: string;
  ip: string;
};

export const getBannedPlayers = () =>
  fetchRequest<TBanResponse[]>({
    method: "GET",
    endpoint: `${SERVER_URL}/api/ban/players`,
  });

export const updateBannedPlayers = (players: BannedPlayer[]) =>
  fetchRequest<TMessageResponse>({
    method: "POST",
    endpoint: `${SERVER_URL}/api/ban/players/update`,
    body: JSON.stringify(players),
  });
