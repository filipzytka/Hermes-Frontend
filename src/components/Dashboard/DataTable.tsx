import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useState } from "react";

type Props<T> = {
  columns: GridColDef[];
  rows: GridRowsProp;
  onAdd?: () => void;
  onRemove?: (items: T[]) => void;
  isBanList?: boolean;
};

export default function DataTable<T>({
  columns,
  rows,
  onAdd,
  onRemove,
  isBanList,
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

    if (onRemove && selectedRows.length > 0) {
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
      <DataGrid
        autoHeight
        checkboxSelection
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(newSelection) =>
          setSelectedRows(newSelection)
        }
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[20]}
        disableColumnResize
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
