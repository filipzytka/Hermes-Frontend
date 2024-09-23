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
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

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
      navigate("/admin/dashboard/home");
    },
    onError: (error: AxiosError) => {
      popUp(
        `${(error.response?.data as TMessageResponse).message}` ||
          "Something went wrong",
        "error"
      );
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: (data) => {
      loginAccountMutate({
        email: data.value.email,
        password: data.value.password,
      });
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
                  onChange: z
                    .string()
                    .min(8, "Email must be at least 8 characters")
                    .email("Invalid email format"),
                }}
                children={(field) => {
                  return (
                    <div>
                      <TextField
                        data-cy="email-input"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                        fullWidth
                        variant="outlined"
                        sx={{ ariaLabel: "email" }}
                      />
                      {field.state.meta.errors && (
                        <div
                          data-cy="error-submit-email"
                          className="text-red-500 text-sm mt-1"
                        >
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
                  onChange: z
                    .string()
                    .min(8, "Password must be at least 8 characters long")
                    .max(100, "Password length cannot exceed 100 characters")
                    .regex(
                      /^(?=.*[a-zA-Z])(?=.*\d)/,
                      "Password must contain both letters and numbers"
                    ),
                }}
                children={(field) => {
                  return (
                    <div>
                      <TextField
                        data-cy="password-input"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        fullWidth
                        variant="outlined"
                      />
                      {field.state.meta.errors && (
                        <div
                          data-cy="error-submit-password"
                          className="text-red-500 text-sm mt-1"
                        >
                          {field.state.meta.errors}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </FormControl>
            <Button
              data-cy="signin_submit"
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              sx={{
                mt: 1,
              }}
            >
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
