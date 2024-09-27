import { useQuery } from "@tanstack/react-query";
import HomeGrid from "../../../components/Dashboard/HomeGrid";
import DashboardLayout from "../../../components/Dashboard/Layout/DashboardLayout";
import {
  getRecentPlayerData,
  getRecentServerData,
  getServerStatus,
} from "../../../api/monitor-server";
import moment from "moment";
import { popUp } from "../../../utils/Popup";
import Loading from "../../../components/Loading";

export default function Dashboard() {
  const { data: serverStatus, refetch: serverStatusRefetch } = useQuery({
    queryKey: ["serverStatus"],
    queryFn: () => getServerStatus(),
  });

  const { data: playerData, refetch: serverPlayersRefetch } = useQuery({
    queryKey: ["playerData"],
    select: (playerData) => ({
      chartData: playerData?.data.map((d) => ({
        x: moment(new Date(d.created)).format("MMMM Do YYYY, HH:mm"),
        y: d.players,
      })),
    }),
    queryFn: () => getRecentPlayerData(),
  });

  const {
    data: serverData,
    refetch: serverDataRefetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["serverData"],
    queryFn: () => getRecentServerData(),
  });

  const handleRefresh = async () => {
    popUp("Server data has been updated", "success");
    serverDataRefetch();
    serverStatusRefetch();
    serverPlayersRefetch();
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <DashboardLayout currentPageIndex={0}>
      <HomeGrid
        handleRefresh={handleRefresh}
        serverStatus={serverStatus}
        serverData={serverData}
        playerData={playerData}
      />
    </DashboardLayout>
  );
}
