import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
import { useEffect, useState } from "react";
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
import {
  deleteCollaborators,
  getCollaborators,
} from "../../../api/collaborators";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";

export default function CollaboratorsGrid() {
  const [collaboratorsRows, setCollaboratorsRows] = useState<GridRowsProp>([]);
  const { isShowing, setIsShowing, toggle } = useModal();
  const { email } = useAuth();

  const { isFetched, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["collaborators"],
    queryFn: () => getCollaborators(),
  });

  const { mutateAsync: deleteUsersMutate } = useMutation({
    mutationKey: ["deleteUsers"],
    mutationFn: (usersToDelete: TCollaborator[]) =>
      deleteCollaborators(usersToDelete),
    onSuccess: async (response) => {
      popUp(`${response?.message}`, "success");
      await fetchCollaborators();
    },
  });

  const handleSendEmail = async (receiverEmail: string, token: string) => {
    const html = render(
      <Welcome username={receiverEmail} token={token} inviterEmail={email} />
    );

    await sendEmail(receiverEmail, "Invitation", html);
    setIsShowing(false);
  };

  const handleCollaboratorRemoval = async (collaborators: TCollaborator[]) => {
    await deleteUsersMutate(collaborators);
  };

  const fetchCollaborators = async () => {
    const { data: recentData } = await refetch();

    if (!recentData) {
      return;
    }

    const collaboratorsData = recentData.collaborators;
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
    fetchCollaborators();
  }, [isFetched]);

  if (isLoading || isFetching) {
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

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Collaborators
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 9 }}>
          {isFetched && (
            <DataTable
              columns={collaboratorColumns}
              rows={collaboratorsRows}
              onAdd={toggle}
              onRemove={handleCollaboratorRemoval}
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
