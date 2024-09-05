import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const collaboratorColumns: GridColDef[] = [
  {
    field: "email",
    headerName: "Email",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 80,
  },
];
