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
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const debouncedSearchLogs = useDebouncedCallback(
    (page: number, size: number, message: string) => {
      return searchLogs(page, size, message);
    },
    150,
    { leading: true, trailing: true }
  );

  const { data: logsData, refetch } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["searched-logs", paginationModel, message],
    queryFn: async () =>
      await debouncedSearchLogs(
        paginationModel.page,
        paginationModel.pageSize,
        message
      ),
  });

  const handleRefresh = async () => {
    const { data: refetchData } = await refetch();
    if (!refetchData) {
      return;
    }

    await refetch();
    popUp("Logs have been updated", "success");
  };

  const logsDataRows =
    logsData?.logs.map((l, index) => ({
      id: index,
      message: l.message,
      created: l.created,
    })) ?? [];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header currentPage={"Logs"} />
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
        Logs
      </Typography>
      <Grid container spacing={2} columns={12}>
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
                onChange={(e) => setMessage(e.target.value)}
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
              rows={logsDataRows}
              rowCount={logsData?.totalCount}
              onPageChange={setPaginationModel}
              paginationModel={paginationModel}
              isCheckbox={false}
              paginationSide="server"
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
