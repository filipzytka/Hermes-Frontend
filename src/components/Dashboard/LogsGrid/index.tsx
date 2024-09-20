import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { popUp } from "../../../utils/Popup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchLogs } from "../../../api/logs";
import { logsColumns } from "./data";
import DataTable from "../DataTable";
import Header from "../Header";
import TextField from "@mui/material/TextField/TextField";
import { useDebouncedCallback } from "use-debounce";

export default function LogsGrid() {
  const [message, setMessage] = useState("");
  const [debouncedMessage, setDebouncedMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const debouncedSetMessage = useDebouncedCallback((value) => {
    setDebouncedMessage(value);
  }, 150);

  const { data: logsData, refetch } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["searched-logs", paginationModel, debouncedMessage],
    select: (data) => ({
      rows: data?.logs.map((l, index) => ({
        id: index,
        message: l.message,
        created: l.created,
      })),
      totalCount: data?.totalCount ?? 0,
    }),
    queryFn: async () =>
      await searchLogs(
        paginationModel.page,
        paginationModel.pageSize,
        debouncedMessage
      ),
  });

  const handleRefresh = async () => {
    await refetch();
    popUp("Logs have been updated", "success");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header currentPage={"Logs"} />
      <Stack
        direction="row"
        sx={{
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
        Logs
      </Typography>
      <Grid container spacing={2} columns={1}>
        <Grid
          size={{ md: 12, lg: 9 }}
          sx={{
            flexGrow: 1,
          }}
        >
          <div>
            <div>
              <TextField
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  debouncedSetMessage(e.target.value);
                }}
                id="search"
                name="search"
                placeholder="search for logs"
                required
                fullWidth
                variant="outlined"
              />
            </div>

            <DataTable
              columns={logsColumns}
              rows={logsData?.rows ?? []}
              rowCount={logsData?.totalCount}
              onPageChange={setPaginationModel}
              paginationModel={paginationModel}
              isCheckbox={false}
              paginationSide="server"
              copyToClipBoard
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
