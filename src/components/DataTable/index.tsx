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
import ModalBody from "./ModalBody";

type TButtonOptions = {
  addLabel?: string;
  deleteLabel?: string;
};

type Props<T> = {
  data: T[];
  onDelete?: (items: T[]) => void;
  onAdd?: () => void;
  rowSelection: boolean;
  pagination: boolean;
  buttonLabels?: TButtonOptions;
};

const DataTable = <T extends Record<string, any>>({
  data,
  onDelete,
  onAdd,
  rowSelection,
  pagination,
  buttonLabels,
}: Props<T>) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const handleSelectedRows = () => {
    const rows = table.getSelectedRowModel().rows;
    const items = rows.map((row) => row.original as T);
    console.log(items);
    setSelectedItems(items);
    open();
  };

  const handleRemoval = () => {
    onDelete!(selectedItems);
    close();
    table.resetRowSelection();
  };

  const columns = Object.keys(data[0] ?? {}).map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
    Cell: ({ cell }) => {
      const value = cell.getValue();
      if (typeof value === "boolean") {
        return value ? "Yes" : "No";
      }

      return value;
    },
  })) as MRT_ColumnDef<T>[];

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: rowSelection,
    columnFilterDisplayMode: "popover",
    enablePagination: pagination,
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
        {onAdd && (
          <Button
            color="cyan"
            onClick={onAdd}
            leftSection={<AiOutlineUserAdd />}
            variant="filled"
          >
            {buttonLabels?.addLabel ?? "Add"}
          </Button>
        )}
        {onDelete && (
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
        )}
        <Modal opened={opened} onClose={close} title="Remove" centered>
          <ModalBody handler={handleRemoval} />
        </Modal>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default DataTable;
