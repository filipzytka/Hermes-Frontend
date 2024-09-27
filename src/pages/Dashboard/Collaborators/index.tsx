import { useMutation, useQuery } from "@tanstack/react-query";
import CollaboratorsGrid from "../../../components/Dashboard/CollaboratorsGrid";
import DashboardLayout from "../../../components/Dashboard/Layout/DashboardLayout";
import { useAuth } from "../../../hooks/useAuth";
import {
  deleteCollaborators,
  getCollaborators,
} from "../../../api/collaborators";
import { popUp } from "../../../utils/Popup";
import { render } from "@react-email/components";
import { TCollaborator } from "../../../api/response-types";
import Welcome from "../../../components/Email/Welcome";
import { sendEmail } from "../../../api/email";
import Loading from "../../../components/Loading";
import useModal from "../../../hooks/useModal";

export default function CollabDashboard() {
  const { email } = useAuth();
  const { isShowing, setIsShowing, toggle } = useModal();

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
    <DashboardLayout currentPageIndex={1}>
      <CollaboratorsGrid
        data={data}
        deleteUsersMutate={deleteUsersMutate}
        handleRefresh={handleRefresh}
        handleSendEmail={handleSendEmail}
        isFetched={isFetched}
        isShowing={isShowing}
        toggle={toggle}
      />
    </DashboardLayout>
  );
}
