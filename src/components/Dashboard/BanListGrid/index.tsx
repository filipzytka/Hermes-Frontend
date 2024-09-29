import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
import Stack from "@mui/material/Stack";
import { bannedPlayersColumns } from "./data";
import Header from "../Header";
import Button from "@mui/material/Button/Button";
import { BannedPlayer } from "../../../api/ban-list";

type Props = {
  handleRefresh: () => void;
  bannedPlayersData?: { rows: { id: number; Token: string; Ip: string }[] };
  updateBannedMutate: (players: BannedPlayer[]) => void;
};

export default function BanListGrid({
  handleRefresh,
  bannedPlayersData,
  updateBannedMutate,
}: Props) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header currentPage={"BanList"} />
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
        Banned Players
      </Typography>
      <Grid container spacing={2} columns={1}>
        <Grid
          size={{ md: 12, lg: 9 }}
          sx={{
            flexGrow: 1,
          }}
        >
          <DataTable
            isBanList={true}
            columns={bannedPlayersColumns}
            rows={bannedPlayersData?.rows ?? []}
            onRemove={updateBannedMutate}
            isCheckbox={true}
            paginationSide={"client"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
