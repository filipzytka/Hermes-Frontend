import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DataTable from "../DataTable";
import Header from "../Header";
import TextField from "@mui/material/TextField/TextField";
import { logsColumns } from "./data";

type Props = {
  handleRefresh: () => void;
  message: string;
  setMessage: (message: string) => void;
  debouncedSetMessage: (message: string) => void;
  paginationModel: {
    pageSize: number;
    page: number;
  };
  setPaginationModel: (model: { pageSize: number; page: number }) => void;
  logsData: {
    rows?: {
      id: number;
      message: string;
      created: string;
    }[];
    totalCount: number;
  };
};

export default function LogsGrid({
  handleRefresh,
  message,
  setMessage,
  debouncedSetMessage,
  logsData,
  paginationModel,
  setPaginationModel,
}: Props) {
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
