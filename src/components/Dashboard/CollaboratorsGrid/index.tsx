import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataTable from "../DataTable";
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
import Header from "../Header";

export default function CollaboratorsGrid() {
  const { isShowing, setIsShowing, toggle } = useModal();
  const { email } = useAuth();

  const {
    data,
    isFetched,
    refetch: collaboratorsRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["collaborators"],
    select: (data) => ({
      rows: data?.collaborators.map((l, index) => ({
        id: index,
        email: l.email,
        role: l.role,
      })),
    }),
    queryFn: () => getCollaborators(),
  });

  const { mutateAsync: deleteUsersMutate } = useMutation({
    mutationKey: ["deleteUsers"],
    mutationFn: (usersToDelete: TCollaborator[]) =>
      deleteCollaborators(usersToDelete),
    onSuccess: async (response) => {
      popUp(`${response?.message}`, "success");
      await collaboratorsRefetch();
    },
  });

  const handleSendEmail = async (receiverEmail: string, token: string) => {
    const html = render(
      <Welcome username={receiverEmail} token={token} inviterEmail={email} />
    );

    await sendEmail(receiverEmail, "Invitation", html);
    setIsShowing(false);
  };

  const handleRefresh = async () => {
    popUp("Collaborators list has been updated", "success");
    collaboratorsRefetch();
  };

  if (isLoading) {
    return <Loading />;
  }

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
