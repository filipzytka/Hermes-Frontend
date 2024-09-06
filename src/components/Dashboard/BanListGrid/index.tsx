import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { popUp } from "../../../utils/Popup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Loading from "../../Loading";
import {
  BannedPlayer,
  getBannedPlayers,
  updateBannedPlayers,
} from "../../../api/ban-list";
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";
import { bannedPlayersColumns } from "./data";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TMessageResponse } from "../../../api/response-types";

export default function BanListGrid() {
  const { loading, setLoading } = useAuth();
  const [bannedPlayersRows, setBannedPlayersRows] = useState<GridRowsProp>([]);

  const { mutateAsync: updateBannedMutate } = useMutation({
    mutationKey: ["updateBan"],
    mutationFn: async (players: BannedPlayer[]) => {
      return updateBannedPlayers(players);
    },
    onSuccess: (response) => {
      popUp(response.message, "success");
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
    fetchBannedPlayers();
  };

  const handleBanPlayersRemoval = async (players: BannedPlayer[]) => {
    await updateBannedMutate(players);
  };

  const fetchBannedPlayers = async () => {
    const listOfBanPlayers = await getBannedPlayers();

    if (!listOfBanPlayers) return;

    const bannedRows = listOfBanPlayers.map((b, index) => ({
      id: index,
      Token: b.Token,
      Ip: b.Ip,
    }));

    setBannedPlayersRows(bannedRows);
  };

  useEffect(() => {
    setLoading(true);
    fetchBannedPlayers();
    setLoading(false);
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
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 9 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Banned Players
          </Typography>
          <DataTable
            isBanList={true}
            columns={bannedPlayersColumns}
            rows={bannedPlayersRows}
            onRemove={handleBanPlayersRemoval}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
