import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  styled,
} from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import getSignInTheme from "../../pages/SignIn/theme/getSignInTheme";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

interface TemplateFrameProps {
  showCustomTheme: boolean;
  toggleCustomTheme: (theme: boolean) => void;
  mode: PaletteMode;
  toggleColorMode: () => void;
  children: React.ReactNode;
}

export default function TemplateFrame({ mode, children }: TemplateFrameProps) {
  const signInTheme = createTheme(getSignInTheme(mode));
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={signInTheme}>
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "8px 12px",
            }}
          >
            <Button
              onClick={() => navigate("/")}
              variant="text"
              size="small"
              aria-label="Back to templates"
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              Home Page
            </Button>
            <IconButton
              onClick={() => navigate("/")}
              size="small"
              aria-label="Back to templates"
              component="a"
              sx={{ display: { xs: "auto", sm: "none" } }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}
