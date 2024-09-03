import { SERVER_URL_BANLIST } from "./constants";
import { fetchRequest } from "./helpers";
import { TBanResponse, TMessageResponse } from "./response-types";

type BannedPlayer = {
  token: string;
  ip: string;
};

export const getBannedPlayers = () =>
  fetchRequest<TBanResponse[]>({
    method: "GET",
    endpoint: `${SERVER_URL_BANLIST}/players`,
  });

export const updateBannedPlayers = (players: BannedPlayer[]) =>
  fetchRequest<TMessageResponse>({
    method: "POST",
    endpoint: `${SERVER_URL_BANLIST}/players/update`,
    body: JSON.stringify(players),
  });
