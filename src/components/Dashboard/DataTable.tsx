import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowSelectionModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import { popUp } from "../../utils/Popup";

type Props<T> = {
  columns: GridColDef[];
  rows: GridRowsProp;
  onAdd?: () => void;
  onRemove?: (items: T[]) => void;
  isBanList?: boolean;
  rowCount?: number;
  isCheckbox: boolean;
  copyToClipBoard?: boolean;
  paginationSide: "server" | "client";
  paginationModel?: {
    pageSize: number;
    page: number;
  };
  onPageChange?: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
};

export default function DataTable<T>({
  columns,
  rows,
  onAdd,
  onRemove,
  isBanList,
  rowCount,
  paginationModel,
  onPageChange,
  isCheckbox,
  paginationSide,
  copyToClipBoard,
}: Props<T>) {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

  const handleRemove = () => {
    if (isBanList) {
      removeBanList();
    } else {
      removeSelectedItems();
    }
  };

  const removeSelectedItems = () => {
    if (onRemove && selectedRows.length > 0) {
      const itemsToRemove = selectedRows.map((id: any) => {
        const row = rows.find((row) => row.id === id);
        if (row) {
          const { id, ...rest } = row;
          return rest as T;
        }
      }) as T[];

      onRemove(itemsToRemove);
    }
  };

  const removeBanList = () => {
    const unselectedRows = rows.filter((row) => !selectedRows.includes(row.id));

    if (onRemove && unselectedRows.length > 0) {
      const itemsToRemove = unselectedRows.map((row) => {
        const { id, ...rest } = row;
        return rest as T;
      }) as T[];

      onRemove(itemsToRemove);
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        {onAdd && (
          <Button
            data-cy="add-button"
            onClick={onAdd}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Invite
          </Button>
        )}
        {onRemove && (
          <Button
            data-cy="remove-button"
            onClick={handleRemove}
            variant="outlined"
          >
            Remove
          </Button>
        )}
      </Box>
      {}
      <DataGrid
        paginationMode={paginationSide}
        checkboxSelection={isCheckbox}
        disableRowSelectionOnClick={!isCheckbox}
        disableColumnResize
        rows={rows}
        rowCount={rowCount}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={({ page, pageSize }) => {
          if (!onPageChange) return;
          onPageChange({ page, pageSize });
        }}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        onRowClick={(params: GridRowParams) => {
          if (!copyToClipBoard) return;
          const selectedMessage = params.row.message;
          navigator.clipboard.writeText(selectedMessage);

          popUp(`Copied to clipboard`, "success");
        }}
        pageSizeOptions={[20, 50, 100]}
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small",
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                },
              },
            },
          },
        }}
      />
    </>
  );
}
