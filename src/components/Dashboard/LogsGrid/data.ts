import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const logsColumns: GridColDef[] = [
  {
    field: "created",
    headerName: "Created",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "message",
    headerName: "Message",
    headerAlign: "left",
    align: "left",
    flex: 7,
  },
];
