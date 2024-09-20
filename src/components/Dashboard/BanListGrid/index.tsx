import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
import { popUp } from "../../../utils/Popup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  BannedPlayer,
  getBannedPlayers,
  updateBannedPlayers,
} from "../../../api/ban-list";
import { bannedPlayersColumns } from "./data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TMessageResponse } from "../../../api/response-types";
import Loading from "../../Loading";
import Header from "../Header";

export default function BanListGrid() {
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
