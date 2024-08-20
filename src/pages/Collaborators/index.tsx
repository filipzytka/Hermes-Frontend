import { useEffect, useState } from "react";
import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";
import { getCollaborators } from "../../api/user";
import useModal from "../../hooks/useModal";
import Welcome from "../../components/Email/Welcome";
import { render } from "@react-email/components";
import { useAuth } from "../../hooks/useAuth";
import { sendEmail } from "../../api/email";
import InvitationModal from "../../components/InvitationModal";
import DataTable from "./DataTable";

export type TCollaborator = {
  email: string;
};

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState<TCollaborator[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const { isShowing, setIsShowing, toggle } = useModal();
  const { email } = useAuth();

  const fetchCollaborators = async () => {
    const response = await getCollaborators();

    setCollaborators(response.payload!.collaborators);
    setIsFetched(true);
  };

  const handleSendEmail = async (receiverEmail: string, token: string) => {
    const html = render(
      <Welcome username={receiverEmail} token={token} inviterEmail={email} />
    );

    await sendEmail(receiverEmail, html);
    setIsShowing(false);
  };

  useEffect(() => {
    fetchCollaborators();
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
      <div className="flex-grow flex flex-col items-center px-3 mt-8 md:mt-32">
        <div className="flex justify-start"></div>
        <div className="w-1/2 flex flex-col">
          <div className="flex-grow ">
            <DataTable
              onDelete={fetchCollaborators}
              onAdd={toggle}
              data={collaborators}
            />
          </div>
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
