import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayersBarChart from "../PlayersBarChart";
import PlayersLineChart from "../PlayersLineChart";
import StatCard from "../StatCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Header from "../Header";
import {
  TMessageResponse,
  TServerDataResponse,
} from "../../../api/response-types";

type Props = {
  handleRefresh: () => void;
  serverStatus?: {
    data: TMessageResponse;
    status: number;
  };

  serverData?: {
    data: TServerDataResponse;
    status: number;
  };
  playerData?: {
    chartData: {
      x: string;
      y: number;
    }[];
  };
};

export default function HomeGrid({
  handleRefresh,
  serverStatus,
  serverData,
  playerData,
}: Props) {
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
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Main panel
      </Typography>
      <Grid
        container
        spacing={2}
        columns={15}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid key={0} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ flexGrow: 1 }}>
          <StatCard
            title="Server status"
            value={serverStatus?.data.message}
            title2="Last updated:"
            value2={serverData?.data.created}
          />
        </Grid>
        <Grid key={1} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ flexGrow: 1 }}>
          <StatCard
            title="Server Name"
            value={serverData?.data.serverName}
            title2="Gamemode"
            value2={serverData?.data.gameMode}
          />
        </Grid>
        <Grid key={2} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ flexGrow: 1 }}>
          <StatCard
            title="Public"
            value={serverData?.data.public?.toString()}
            title2="Port"
            value2={serverData?.data.port?.toString()}
          />
        </Grid>
        <Grid key={3} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ flexGrow: 1 }}>
          <StatCard
            title="Has password"
            value={serverData?.data.hasPassword?.toString()}
            title2="Server Type"
            value2={serverData?.data.serverType?.toString()}
          />
        </Grid>
        <Grid key={4} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ flexGrow: 1 }}>
          <StatCard
            title="World"
            value={serverData?.data.world}
            title2="Version"
            value2={serverData?.data.version}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={1}>
        <Grid key={5} size={{ sm: 12, md: 6 }} sx={{ flexGrow: 1 }}>
          <PlayersLineChart
            yAxisData={playerData?.chartData.map((point) => point.y) ?? []}
            xAxisData={playerData?.chartData.map((point) => point.x) ?? []}
          />
        </Grid>

        <Grid key={6} size={{ sm: 12, md: 6 }} sx={{ flexGrow: 1 }}>
          <PlayersBarChart
            yAxisData={playerData?.chartData.map((point) => point.y) ?? []}
            xAxisData={playerData?.chartData.map((point) => point.x) ?? []}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
