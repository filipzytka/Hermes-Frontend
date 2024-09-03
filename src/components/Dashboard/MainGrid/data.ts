import { GridColDef } from "@mui/x-data-grid";

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

export type TGraphDataset = {
  x: string;
  y: number;
};
