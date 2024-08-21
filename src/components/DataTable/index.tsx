import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Box, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { useState } from "react";

type TButtonOptions = {
  addLabel?: string;
  deleteLabel?: string;
};

type Props<T> = {
  data: T[];
  onDelete: (items: T[]) => void;
  onAdd: () => void;
  buttonLabels?: TButtonOptions;
};

const DataTable = <T extends Record<string, any>>({
  data,
  onDelete,
  onAdd,
  buttonLabels,
}: Props<T>) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const handleSelectedRows = () => {
    const rows = table.getSelectedRowModel().rows;
    const items = rows.map((row) => row.original as T);
    setSelectedItems(items);
    open();
  };

  const handleRemoval = () => {
    onDelete(selectedItems);
    close();
    table.resetRowSelection();
  };

  const columns = Object.keys(data[0] ?? {}).map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
    size: 80,
  })) as MRT_ColumnDef<T>[];

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
          {buttonLabels?.addLabel ?? "Add"}
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
          {buttonLabels?.deleteLabel ?? "Delete"}
        </Button>
        <Modal opened={opened} onClose={close} title="Remove" centered>
          <p>Are you sure you want to remove selected records? </p>
          <div className="mt-3">
            <button
              onClick={handleRemoval}
              type="submit"
              className="py-1 px-4 inline-flex justify-center items-center gap-2 rounded-md
                 border border-transparent font-semibold
                bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Remove
            </button>
          </div>
        </Modal>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default DataTable;
