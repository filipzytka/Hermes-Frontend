import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { GridRowsProp } from "@mui/x-data-grid";
import { popUp } from "../../../utils/Popup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import { getLogs } from "../../../api/logs";
import { logsColumns } from "./data";
import DataTable from "../DataTable";
import Header from "../Header";

export default function LogsGrid() {
  const [logsRows, setLogsRows] = useState<GridRowsProp>([]);
  const { isFetched, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["logs"],
    queryFn: () => getLogs(1, 200),
  });

  const fetchLogs = async () => {
    const { data: recentLogs } = await refetch();
    if (!recentLogs) {
      return;
    }

    const collaboratorsRows = recentLogs.map((c, index) => ({
      id: index,
      message: c.message,
      created: c.created,
    }));

    setLogsRows(collaboratorsRows);
  };

  const handleRefresh = async () => {
    popUp("Logs have been updated", "success");
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
  }, [isFetched]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

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
        <Grid size={{ md: 12, lg: 9 }}>
          {isFetched && <DataTable columns={logsColumns} rows={logsRows} />}
        </Grid>
      </Grid>
    </Box>
  );
}
