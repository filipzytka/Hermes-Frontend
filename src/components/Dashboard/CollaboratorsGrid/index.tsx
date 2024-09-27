import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
import InvitationModal from "../../InvitationModal";
import { collaboratorColumns } from "./data";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Header from "../Header";
import { TCollaborator } from "../../../api/response-types";

type Props = {
  handleRefresh: () => void;
  isFetched: boolean;
  toggle: () => void;
  deleteUsersMutate: (usersToDelete: TCollaborator[]) => void;
  isShowing: boolean;
  handleSendEmail: (receiverEmail: string, token: string) => void;
  data:
    | {
        rows: {
          id: number;
          email: string;
          role: string;
        }[];
      }
    | undefined;
};

export default function CollaboratorsGrid({
  handleRefresh,
  isFetched,
  toggle,
  deleteUsersMutate,
  isShowing,
  handleSendEmail,
  data,
}: Props) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header currentPage={"Collaborators"} />
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
        Collaborators
      </Typography>
      <Grid container spacing={2} columns={1}>
        <Grid
          size={{ md: 12, lg: 9 }}
          sx={{
            flexGrow: 1,
          }}
        >
          {isFetched && (
            <DataTable
              isCheckbox={true}
              columns={collaboratorColumns}
              rows={data?.rows ?? []}
              onAdd={toggle}
              onRemove={deleteUsersMutate}
              paginationSide={"client"}
            />
          )}
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
