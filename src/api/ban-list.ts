import { BannedPlayer } from "../pages/Ban";
import { SERVER_URL_BANLIST } from "./constants";
import { fetchRequest } from "./helpers";
import { TBanResponse } from "./response-types";

export const getBannedPlayers = () =>
  fetchRequest<TBanResponse>({
    method: "GET",
    endpoint: `${SERVER_URL_BANLIST}/players`,
  });

export const removeBannedPlayers = (players: BannedPlayer[]) =>
  fetchRequest({
    method: "POST",
    endpoint: `${SERVER_URL_BANLIST}/players/remove`,
    body: JSON.stringify(players),
  });
