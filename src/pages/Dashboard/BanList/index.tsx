import DashboardLayout from "../../../components/Dashboard/Layout/DashboardLayout";
import BanListGrid from "../../../components/Dashboard/BanListGrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BannedPlayer,
  getBannedPlayers,
  updateBannedPlayers,
} from "../../../api/ban-list";
import { popUp } from "../../../utils/Popup";
import { AxiosError } from "axios";
import { TMessageResponse } from "../../../api/response-types";
import Loading from "../../../components/Loading";

export default function BanListDashboard() {
  const BANLIST_PAGE_INDEX = 2;

  const {
    data: bannedPlayersData,
    refetch: bannedPlayersRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["bannedPlayers"],
    select: (data) => ({
      rows: data?.map((b, index) => ({
        id: index,
        Token: b.Token,
        Ip: b.Ip,
      })),
    }),
    queryFn: () => getBannedPlayers(),
  });

  const { mutateAsync: updateBannedMutate } = useMutation({
    mutationKey: ["updateBan"],
    mutationFn: async (players: BannedPlayer[]) => {
      return updateBannedPlayers(players);
    },
    onSuccess: async (response) => {
      popUp(response.message, "success");
      await bannedPlayersRefetch();
    },
    onError: (error: AxiosError) => {
      popUp(
        `${(error.response?.data as TMessageResponse).message}` ||
          "Something went wrong",
        "error"
      );
    },
  });

  const handleRefresh = async () => {
    popUp("Ban list has been updated", "success");
    await bannedPlayersRefetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DashboardLayout currentPageIndex={BANLIST_PAGE_INDEX}>
      <BanListGrid
        handleRefresh={handleRefresh}
        bannedPlayersData={bannedPlayersData}
        updateBannedMutate={updateBannedMutate}
      />
    </DashboardLayout>
  );
}
