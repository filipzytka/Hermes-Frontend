import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import {
  createTheme,
  ThemeProvider,
  styled,
  PaletteMode,
} from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";
import { useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import { validateToken } from "../../api/token";
import TemplateFrame from "../../components/MUI-components/TemplateFrame";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignUp() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const [token, setToken] = useState("");
  const [inviter, setInviter] = useState("");
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const navigate = useNavigate();

  const { mutateAsync: registerAccountMutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async ({
      email,
      password,
      token,
    }: {
      email: string;
      password: string;
      token: string;
    }) => {
      return registerUser(email, password, token);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      navigate("/");
    },
  });

  const handleRegisterData = async (email: string, password: string) => {
    await registerAccountMutate({ email, password, token });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      handleRegisterData(data.value.email, data.value.password);
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchedToken = queryParams.get("token");
    if (!searchedToken) {
      navigate("/login");
      return;
    }

    setToken(searchedToken);

    const validateTokenStatus = async () => {
      const response = await validateToken(searchedToken);

      if (response.status !== 200) {
        navigate("/login");
      }

      setInviter(response.data.createdBy);
    };

    validateTokenStatus();
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
        <CssBaseline enableColorScheme />

        <SignUpContainer direction="column" justifyContent="space-between">
          <Stack
            sx={{
              justifyContent: "center",
              height: "100dvh",
              p: 2,
            }}
          >
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                You have been invited by {inviter} to Sign Up
              </Typography>
              <Box
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                component="form"
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>

                  <form.Field
                    name="email"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: ({ value }) => {
                        if (value.length < 8 && value.length !== 0) {
                          return "Email must be at least 8 characters long";
                        }

                        if (
                          value.length !== 0 &&
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ) {
                          return "Invalid email format";
                        }
                      },
                    }}
                    children={(field) => {
                      return (
                        <div>
                          <TextField
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            sx={{ ariaLabel: "email" }}
                          />
                          {field.state.meta.errors && (
                            <div className="text-red-500 text-sm mt-1">
                              {field.state.meta.errors}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>

                  <form.Field
                    name="password"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
                        if (value.length < 8 && value.length !== 0) {
                          return "Password must be at least 8 characters long";
                        }
                        if (
                          value.length !== 0 &&
                          (!/\d/.test(value) || !/[a-zA-Z]/.test(value))
                        ) {
                          return "Password must contain both letters and numbers";
                        }
                      },
                    }}
                    children={(field) => {
                      return (
                        <div>
                          <TextField
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                          />
                          {field.state.meta.errors && (
                            <div className="text-red-500 text-sm mt-1">
                              {field.state.meta.errors}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  Sign up
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <span>
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{ alignSelf: "center" }}
                    >
                      Sign in
                    </Link>
                  </span>
                </Typography>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
