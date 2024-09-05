import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
import { useEffect, useState } from "react";
import { deleteUsers, getCollaborators } from "../../../api/user";
import { GridRowsProp } from "@mui/x-data-grid";
import useModal from "../../../hooks/useModal";
import { render } from "@react-email/components";
import Welcome from "../../Email/Welcome";
import { sendEmail } from "../../../api/email";
import { useAuth } from "../../../hooks/useAuth";
import InvitationModal from "../../InvitationModal";
import { popUp } from "../../../utils/Popup";
import { TCollaborator } from "../../../api/response-types";
import { collaboratorColumns } from "./data";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Loading from "../../Loading";

export default function CollaboratorsGrid() {
  const [collaboratorsRows, setCollaboratorsRows] = useState<GridRowsProp>([]);
  const { email, loading, setLoading } = useAuth();
  const { isShowing, setIsShowing, toggle } = useModal();

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

  const fetchCollaborators = async () => {
    const response = await getCollaborators();

    const collaboratorsData = response.payload!.collaborators;
    const collaboratorsRows = collaboratorsData.map((c, index) => ({
      id: index,
      email: c.email,
    }));

    setCollaboratorsRows(collaboratorsRows);
  };

  const handleRefresh = async () => {
    popUp("Collaborators list has been updated", "success");
    fetchCollaborators();
  };

  useEffect(() => {
    setLoading(true);
    fetchCollaborators();
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
