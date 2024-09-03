import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
import PlayersBarChart from "../PlayersBarChart";
import PlayersLineChart from "../PlayersLineChart";
import StatCard from "../StatCard";
import { useEffect, useState } from "react";
import { deleteUsers, getCollaborators } from "../../../api/user";
import { GridRowsProp } from "@mui/x-data-grid";
import { getChartData, getServerData } from "../../../api/monitor-server";
import useModal from "../../../hooks/useModal";
import { render } from "@react-email/components";
import Welcome from "../../Email/Welcome";
import { sendEmail } from "../../../api/email";
import { useAuth } from "../../../hooks/useAuth";
import InvitationModal from "../../InvitationModal";
import { popUp } from "../../../utils/Popup";
import {
  TCollaborator,
  TServerDataResponse,
} from "../../../api/response-types";
import { getBannedPlayers } from "../../../api/ban-list";
import {
  TGraphDataset,
  collaboratorColumns,
  bannedPlayersColumns,
} from "./data";

export default function MainGrid() {
  const [serverData, setServerData] = useState<TServerDataResponse>();
  const [collaboratorsRows, setCollaboratorsRows] = useState<GridRowsProp>([]);
  const [bannedPlayersRows, setBannedPlayersRows] = useState<GridRowsProp>([]);
  const [chartData, setChartData] = useState<TGraphDataset[]>([]);
  const { email } = useAuth();
  const { isShowing, setIsShowing, toggle } = useModal();

  const fetchPlayersCount = async () => {
    const responsePlayersCount = await getChartData();

    if (!responsePlayersCount.success) {
      return;
    }
    const data = responsePlayersCount.payload;

    if (!data) {
      return;
    }

    const parsedToChartFormat: TGraphDataset[] = data.map((d) => ({
      x: d.date,
      y: d.players,
    }));

    setChartData(parsedToChartFormat);
  };

  const handleSendEmail = async (receiverEmail: string, token: string) => {
    const html = render(
      <Welcome username={receiverEmail} token={token} inviterEmail={email} />
    );

    await sendEmail(receiverEmail, html);
    setIsShowing(false);
  };

  const handleCollaboratorRemoval = async (collaborators: TCollaborator[]) => {
    if (!collaborators) return;
    const response = await deleteUsers(collaborators);

    if (response.success) {
      popUp(`${response.payload!.message}`, "success");
      fetchCollaborators();
    } else {
      popUp(`${response.payload!.message}`, "error");
    }
  };

  const fetchServerData = async () => {
    const responseServerData = await getServerData();

    if (!responseServerData.success) {
      return;
    }

    const payload = responseServerData.payload;

    if (payload) {
      setServerData(payload);
    }
  };

  const fetchBannedPlayers = async () => {
    const response = await getBannedPlayers();

    const bannedPlayers = response.payload;
    console.log(bannedPlayers);
    if (!bannedPlayers) return;

    const bannedRows = bannedPlayers.map((b, index) => ({
      id: index,
      Token: b.Token,
      Ip: b.Ip,
    }));

    setBannedPlayersRows(bannedRows);
  };

  const fetchCollaborators = async () => {
    const response = await getCollaborators();

    const collaboratorsData = response.payload!.collaborators;
    const collaboratorsRows = collaboratorsData.map((c, index) => ({
      id: index,
      email: c.email,
    }));

    setCollaboratorsRows(collaboratorsRows);
  };

  useEffect(() => {
    fetchCollaborators();
    fetchServerData();
    fetchPlayersCount();
    fetchBannedPlayers();
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
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
        <Grid key={1} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Public"
            value={serverData?.public.toString()}
            title2="Port"
            value2={serverData?.port.toString()}
          />
        </Grid>{" "}
        <Grid key={1} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Has password"
            value={serverData?.hasPassword.toString()}
            title2="Server Type"
            value2={serverData?.serverType.toString()}
          />
        </Grid>
        <Grid key={1} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="World"
            value={serverData?.world}
            title2="Version"
            value2={serverData?.version}
          />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <PlayersLineChart
            yAxisData={chartData.map((point) => point.y)}
            xAxisData={chartData.map((point) => point.x)}
          />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <PlayersBarChart
            xAxisData={chartData.map((point) => point.x)}
            yAxisData={chartData.map((point) => point.y)}
          />
        </Grid>
      </Grid>

      <Grid size={{ md: 12, lg: 9 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Banned Players
        </Typography>
        <DataTable columns={bannedPlayersColumns} rows={bannedPlayersRows} />
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 2 }}>
        Collaborators
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 9 }}>
          <DataTable
            columns={collaboratorColumns}
            rows={collaboratorsRows}
            onAdd={toggle}
            onRemove={handleCollaboratorRemoval}
          />
        </Grid>
      </Grid>

      <InvitationModal
        isShowing={isShowing}
        onSend={handleSendEmail}
        onClose={toggle}
      />
    </Box>
  );
}
