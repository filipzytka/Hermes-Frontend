import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayersBarChart from "../PlayersBarChart";
import PlayersLineChart from "../PlayersLineChart";
import StatCard from "../StatCard";
import { useEffect, useState } from "react";
import { getServerData, getServerStatus } from "../../../api/monitor-server";
import { useAuth } from "../../../hooks/useAuth";
import { popUp } from "../../../utils/Popup";
import { TServerDataResponse } from "../../../api/response-types";
import { TGraphDataset } from "./data";
import Loading from "../../Loading";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type TServerStatus = "Online" | "Offline";

export default function HomeGrid() {
  const [serverData, setServerData] = useState<TServerDataResponse>();
  const [chartData, setChartData] = useState<TGraphDataset[]>([]);
  const [serverStatus, setServerStatus] = useState<TServerStatus>("Offline");
  const { loading, setLoading } = useAuth();

  const fetchServerStatus = async () => {
    const responseServer = await getServerStatus();

    if (responseServer.status !== 200) {
      setServerStatus("Offline");

      return;
    }

    if (responseServer.data) {
      setServerStatus(responseServer.data.message as TServerStatus);
    }
  };

  const fetchServerData = async () => {
    const responseServer = await getServerData();

    if (responseServer.status !== 200) {
      return;
    }

    if (!responseServer.data) {
      return;
    }

    const item = responseServer.data.reduce((prev, current) =>
      +prev.id > +current.id ? prev : current
    );

    setServerData(item);

    const parsedToChartFormat: TGraphDataset[] = responseServer.data.map(
      (d) => ({
        x: d.created,
        y: d.players,
      })
    );

    setChartData(parsedToChartFormat);
  };

  const fetchAll = async () => {
    setLoading(true);
    fetchServerData();
    fetchServerStatus();
    setLoading(false);
  };

  const handleRefresh = async () => {
    popUp("Server data has been updated", "success");
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Stack
        direction="row"
        sx={{
          flexGrow: 1,
          p: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
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
            value={serverData?.serverName}
            title2="Gamemode"
            value2={serverData?.gameMode}
          />
        </Grid>{" "}
        <Grid key={2} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Public"
            value={serverData?.public?.toString()}
            title2="Port"
            value2={serverData?.port?.toString()}
          />
        </Grid>{" "}
        <Grid key={3} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Has password"
            value={serverData?.hasPassword?.toString()}
            title2="Server Type"
            value2={serverData?.serverType?.toString()}
          />
        </Grid>
        <Grid key={4} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="World"
            value={serverData?.world}
            title2="Version"
            value2={serverData?.version}
          />
        </Grid>
        <Grid key={5} size={{ sm: 12, md: 6 }}>
          <PlayersLineChart
            yAxisData={chartData.map((point) => point.y)}
            xAxisData={chartData.map((point) => point.x)}
          />
        </Grid>
        <Grid key={6} size={{ sm: 12, md: 6 }}>
          <PlayersBarChart
            xAxisData={chartData.map((point) => point.x)}
            yAxisData={chartData.map((point) => point.y)}
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
            value={serverStatus}
            title2="Last updated:"
            value2={serverData?.created}
          />
        </Grid>
      </Grid>
    </Box>
  );
}