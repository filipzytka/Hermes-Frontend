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
};

export default function DataTable<T>({
  columns,
  rows,
  onAdd,
  onRemove,
}: Props<T>) {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

  const handleRemove = () => {
    if (onRemove && selectedRows.length > 0) {
      const itemsToRemove = selectedRows.map((id: any) => {
        const row = rows.find((row) => row.id === id);
        if (row) {
          const { id, ...rest } = row;
          return rest as T;
        }
      }) as T[];

      console.log(itemsToRemove);

      onRemove(itemsToRemove);
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        {onAdd && (
          <Button onClick={onAdd} variant="outlined" sx={{ mr: 1 }}>
            Invite
          </Button>
        )}
        {onRemove && (
          <Button onClick={handleRemove} variant="outlined">
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
        pageSizeOptions={[10, 20, 50]}
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
