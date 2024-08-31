import { Modal } from "@mantine/core";
import DataTable from "../../components/DataTable";
import Footer from "../../components/Layout/Footer";
import NavigationBar from "../../components/Layout/NavigationBar";
import { useDisclosure } from "@mantine/hooks";
import ModalInput from "./ModalInput";
import { useEffect, useState } from "react";
import { updateBannedPlayers, getBannedPlayers } from "../../api/ban-list";
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

    const bannedPlayers = response.payload;
    if (!bannedPlayers) return;

    setBannedPlayers(bannedPlayers!);
    setIsFetched(true);
  };

  useEffect(() => {
    fetchBannedPlayers();
  }, []);

  const addBannedPlayer = async () => {
    if (token && ip) {
      const playerToBan: BannedPlayer = { token, ip };
      const updatedBannedList = [...bannedPlayers, playerToBan];
      const response = await updateBannedPlayers(updatedBannedList);

      if (response.success) {
        popUp(response.payload!.message, "success");
        fetchBannedPlayers();
      } else {
        popUp(response.payload!.message, "error");
      }
      close();
    }
  };

  const handleBanRemoval = async (playersToRemove: BannedPlayer[]) => {
    if (!playersToRemove) return;

    const updatedBannedPlayers = bannedPlayers.filter(
      (p) => !playersToRemove.includes(p)
    );
    const response = await updateBannedPlayers(updatedBannedPlayers);

    if (response.success) {
      popUp(response.payload!.message, "success");
      fetchBannedPlayers();
    } else {
      popUp(response.payload!.message, "error");
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
      <div className="flex-grow flex flex-col md:items-center px-3 mt-8 md:mt-32">
        <div className="flex justify-start"></div>
        <div className="md:w-1/2 flex flex-col">
          <div className="flex-grow">
            <DataTable
              buttonLabels={{ addLabel: "Ban", deleteLabel: "Unban" }}
              onDelete={handleBanRemoval}
              onAdd={open}
              data={bannedPlayers}
              rowSelection={true}
              pagination={true}
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
