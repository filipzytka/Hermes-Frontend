import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayersBarChart from "../PlayersBarChart";
import PlayersLineChart from "../PlayersLineChart";
import StatCard from "../StatCard";
import {
  getRecentPlayerData,
  getRecentServerData,
  getServerStatus,
} from "../../../api/monitor-server";
import { popUp } from "../../../utils/Popup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import Header from "../Header";

export default function HomeGrid() {
  const { data: serverStatus, refetch: serverStatusRefetch } = useQuery({
    queryKey: ["serverStatus"],
    queryFn: () => getServerStatus(),
  });

  const { data: playerData, refetch: serverPlayersRefetch } = useQuery({
    queryKey: ["playerData"],
    select: (playerData) => ({
      chartData: playerData?.data.map((d) => ({
        x: d.created,
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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header currentPage={"Home"} />
      <Stack
        direction="row"
        sx={{
          flexGrow: 1,
          py: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }} />
        <Button variant="outlined" onClick={handleRefresh}>
          Refresh
        </Button>
      </Stack>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid key={1} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Server Name"
            value={serverData?.data.serverName}
            title2="Gamemode"
            value2={serverData?.data.gameMode}
          />
        </Grid>
        <Grid key={2} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Public"
            value={serverData?.data.public.toString()}
            title2="Port"
            value2={serverData?.data.port.toString()}
          />
        </Grid>
        <Grid key={3} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Has password"
            value={serverData?.data.hasPassword.toString()}
            title2="Server Type"
            value2={serverData?.data.serverType.toString()}
          />
        </Grid>
        <Grid key={4} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="World"
            value={serverData?.data.world}
            title2="Version"
            value2={serverData?.data.version}
          />
        </Grid>
        <Grid
          key={5}
          size={{ sm: 12, md: 6 }}
          sx={{
            flexGrow: 1,
          }}
        >
          <PlayersLineChart
            yAxisData={playerData?.chartData.map((point) => point.y) ?? []}
            xAxisData={playerData?.chartData.map((point) => point.x) ?? []}
          />
        </Grid>
        <Grid
          key={6}
          size={{ sm: 12, md: 6 }}
          sx={{
            flexGrow: 1,
          }}
        >
          <PlayersBarChart
            xAxisData={playerData?.chartData.map((point) => point.x) ?? []}
            yAxisData={playerData?.chartData.map((point) => point.y) ?? []}
          />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 2 }}>
        Server
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid key={7} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Status"
            value={serverStatus?.data.message}
            title2="Last updated:"
            value2={serverData?.data.created}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
