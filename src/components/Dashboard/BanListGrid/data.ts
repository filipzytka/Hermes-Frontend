import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const bannedPlayersColumns: GridColDef[] = [
  {
    field: "Token",
    headerName: "Token",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "Ip",
    headerName: "Ip",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 80,
  },
];
