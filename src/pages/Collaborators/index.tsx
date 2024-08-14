import { useEffect, useState } from "react";
import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";
import { GetCollaborators } from "../../services/user-service";
import useModal from "../../hooks/useModal";
import Welcome from "../../components/Email/Welcome";
import { render } from "@react-email/components";
import { useAuth } from "../../hooks/useAuth";
import { SendEmail } from "../../services/email-service";
import InvitationModal from "../../components/InvitationModal";
import DataTable from "../../components/DataTable";
import Loading from "../../components/Loading";

export type TCollaborator = {
  email: string;
};

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState<TCollaborator[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const { isShowing, setIsShowing, toggle } = useModal();
  const { email } = useAuth();

  const FetchCollaborators = async () => {
    const response = await GetCollaborators();

    setCollaborators(response?.collaborators);
    setIsFetched(true);
  };

  const handleSendEmail = async (receiverEmail: string, token: string) => {
    const html = render(
      <Welcome username={receiverEmail} token={token} inviterEmail={email} />
    );

    await SendEmail(receiverEmail, html);
    setIsShowing(false);
  };

  useEffect(() => {
    FetchCollaborators();
  }, []);

  if (!isFetched) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex-grow" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow flex items-center justify-center px-3">
        <div className="w-full sm:w-1/2 my-28">
          <h2 className="dark:text-white text-gray-800 text-3xl my-4">
            Manage collaborators
          </h2>
          <DataTable
            onDelete={FetchCollaborators}
            onAdd={toggle}
            data={collaborators}
          />
        </div>
      </div>
      <InvitationModal
        isShowing={isShowing}
        onSend={handleSendEmail}
        onClose={toggle}
      />
      <Footer />
    </div>
  );
};

export default Collaborators;
