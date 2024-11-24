import createTheme from "@mui/material/styles/createTheme";
import { useState } from "react";
import getSignInTheme from "../../pages/SignIn/theme/getSignInTheme";
import { PaletteMode } from "@mui/material/styles/createPalette";
import TemplateFrame from "../MUI-components/TemplateFrame";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";

type Props = {
  children: React.ReactNode;
};

const AuthThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));

  const toggleColorMode = () => {
    setMode("dark");
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <div>
      <TemplateFrame
        toggleCustomTheme={toggleCustomTheme}
        showCustomTheme={showCustomTheme}
        mode={mode}
        toggleColorMode={toggleColorMode}
      >
        <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </TemplateFrame>
    </div>
  );
};

export default AuthThemeProvider;
