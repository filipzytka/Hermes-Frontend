import { Modal } from "@mantine/core";
import DataTable from "../../components/DataTable";
import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";
import { useDisclosure } from "@mantine/hooks";
import ModalInput from "./ModalInput";
import { useEffect, useState } from "react";
import { removeBannedPlayers, getBannedPlayers } from "../../api/ban-list";
import { popUp } from "../../utils/Popup";

export type BannedPlayer = {
  token: string;
  ip: string;
};

const Ban = () => {
  const [bannedPlayers, setBannedPlayers] = useState<BannedPlayer[]>([]);
  const [token, setToken] = useState("");
  const [ip, setIP] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchBannedPlayers = async () => {
    const response = await getBannedPlayers();

    const bannedPlayers = response.payload?.players;
    if (!bannedPlayers) return;

    setBannedPlayers(bannedPlayers!);
    setIsFetched(true);
  };

  useEffect(() => {
    fetchBannedPlayers();
  }, []);

  const addBannedPlayer = () => {
    if (token && ip) {
      const playerToBan: BannedPlayer = { token, ip };
      setBannedPlayers((prevPlayers) => [...prevPlayers, playerToBan]);
      close();
    }
  };

  const handleBanRemoval = async (playersToRemove: BannedPlayer[]) => {
    if (!playersToRemove) return;
    const response = await removeBannedPlayers(playersToRemove);

    if (response.success) {
      popUp(`Players have been unbaned successfully!`, "success");
      fetchBannedPlayers();
    } else {
      popUp(`Something went wrong`, "error");
    }
  };

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
          <div className="flex-grow">
            <DataTable
              buttonLabels={{ addLabel: "Ban", deleteLabel: "Unban" }}
              onDelete={handleBanRemoval}
              onAdd={open}
              data={bannedPlayers}
            />
          </div>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Add player to the blacklist"
        centered
      >
        <div className="flex gap-3 flex-col">
          <p className="text-sm">Ban player</p>
          <ModalInput
            onValueChange={setToken}
            placeholder="Enter player token"
          />
          <ModalInput onValueChange={setIP} placeholder="Enter player IP" />
        </div>
        <button
          onClick={addBannedPlayer}
          type="submit"
          className="py-1 px-4 mt-4 inline-flex justify-center items-center gap-2 rounded-md
                 border border-transparent font-semibold
                bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Add
        </button>
      </Modal>
      <Footer />
    </div>
  );
};

export default Ban;
