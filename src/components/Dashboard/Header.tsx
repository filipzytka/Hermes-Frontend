import Stack from "@mui/material/Stack";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";

type Props = {
  currentPage: string;
};

export default function Header({ currentPage }: Props) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs currentPage={currentPage} />
    </Stack>
  );
}