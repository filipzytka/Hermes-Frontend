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
import { getBannedPlayers } from "../../../api/ban-list";
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";
import { bannedPlayersColumns } from "./data";

export default function BanListGrid() {
  const { loading, setLoading } = useAuth();
  const [bannedPlayersRows, setBannedPlayersRows] = useState<GridRowsProp>([]);

  const handleRefresh = async () => {
    popUp("Ban list has been updated", "success");
    fetchBannedPlayers();
  };

  const fetchBannedPlayers = async () => {
    const response = await getBannedPlayers();

    const bannedPlayers = response.payload;
    if (!bannedPlayers) return;

    const bannedRows = bannedPlayers.map((b, index) => ({
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
          <DataTable columns={bannedPlayersColumns} rows={bannedPlayersRows} />
        </Grid>
      </Grid>
    </Box>
  );
}
