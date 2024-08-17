import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Box, Button, Modal } from "@mantine/core";
import { TCollaborator } from "../../pages/Collaborators";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { deleteUsers } from "../../api/user";
import { popUp } from "../../utils/Popup";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";

const columns: MRT_ColumnDef<TCollaborator>[] = [
  {
    accessorKey: "email",
    header: "Email",
    size: 120,
  },
  {
    accessorKey: "joined",
    header: "Joined",
    size: 120,
  },
];

type Props = {
  data: TCollaborator[];
  onDelete: () => void;
  onAdd: () => void;
};

const DataTable = ({ data, onDelete, onAdd }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUsers, setSelectedUsers] = useState<TCollaborator[]>([]);

  const handleCollaboratorRemoval = async () => {
    if (!selectedUsers) return;
    const response = await deleteUsers(selectedUsers);

    if (response.success) {
      popUp(`${response.payload!.message}`, "success");
      onDelete();
      close();
    } else {
      popUp(`${response.payload!.message}`, "error");
    }
  };

  const handleSelectedRows = () => {
    const rows = table.getSelectedRowModel().rows;
    const users = rows.map((row) => row.original as TCollaborator);
    setSelectedUsers(users);
    open();
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        style={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          color="cyan"
          onClick={onAdd}
          leftSection={<AiOutlineUserAdd />}
          variant="filled"
        >
          Add collaborator
        </Button>
        <Button
          color="darkred"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={handleSelectedRows}
          leftSection={<AiOutlineUserDelete />}
          variant="filled"
        >
          Delete
        </Button>
        <Modal
          opened={opened}
          onClose={close}
          title="Remove collaborator"
          centered
        >
          <p>Are you sure you want to remove selected users? </p>
          <div className="mt-3">
            <button
              onClick={handleCollaboratorRemoval}
              type="submit"
              className="py-1 px-4 inline-flex justify-center items-center gap-2 rounded-md
                 border border-transparent font-semibold
                bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              {"Remove "}
            </button>
          </div>
        </Modal>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default DataTable;
