import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useForm } from "@tanstack/react-form";
import { popUp } from "../../utils/Popup";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TMessageResponse } from "../../api/response-types";
import AuthThemeProvider from "../../components/AuthThemeProvider";

export default function SignIn() {
  const { setAuth, setRole, setEmail } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: loginAccountMutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return loginUser(email, password);
    },
    onSuccess: (response) => {
      setAuth(true);
      setRole(response.role);
      setEmail(response.email);
      navigate("/");
    },
    onError: (error: AxiosError) => {
      popUp(
        `${(error.response?.data as TMessageResponse).message}` ||
          "Something went wrong",
        "error"
      );
    },
  });

  const handleLoginData = async (email: string, password: string) => {
    await loginAccountMutate({ email, password });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      handleLoginData(data.value.email, data.value.password);
    },
  });

  return (
    <AuthThemeProvider>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>

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
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AuthThemeProvider>
  );
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));
