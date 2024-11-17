import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import { validateToken } from "../../api/token";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerUser } from "../../api/user";
import AuthThemeProvider from "../../components/AuthThemeProvider";
import { popUp } from "../../utils/Popup";
import { AxiosError } from "axios";
import { TEmailErrorResponse } from "../../api/response-types";
import Loading from "../../components/Loading";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import FormInput from "../../components/FormInput";

export default function SignUp() {
  const [validationToken, setValidationToken] = useState("");
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
    onError: (error: AxiosError<TEmailErrorResponse>) => {
      popUp(`${error.response?.data?.errors?.Email[0]}`, "error");
    },
  });

  const {
    data: validationData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["validation"],
    queryFn: async () => {
      const queryParams = new URLSearchParams(location.search);
      const searchedToken = queryParams.get("token");
      if (!searchedToken) {
        navigate("/login");
        return;
      }

      setValidationToken(searchedToken);

      return await validateToken(searchedToken);
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: (data) => {
      registerAccountMutate({
        email: data.value.email,
        password: data.value.password,
        token: validationToken,
      });
    },
  });

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthThemeProvider>
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
              sx={{ width: "100%", fontSize: "1rem" }}
            >
              You have been invited by {validationData?.data.createdBy}
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "1.25rem" }}
            >
              Sign Up
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
                      <FormInput
                        handleChange={field.handleChange}
                        handleBlur={field.handleBlur}
                        type="email"
                      >
                        {field.state.meta.errors.length > 0 && (
                          <div className="text-red-500 text-sm mt-1">
                            {field.state.meta.errors}
                          </div>
                        )}
                      </FormInput>
                    );
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>

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
                      <FormInput
                        handleChange={field.handleChange}
                        handleBlur={field.handleBlur}
                        type="password"
                      >
                        {field.state.meta.errors && (
                          <div className="text-red-500 text-sm mt-1">
                            {field.state.meta.errors}
                          </div>
                        )}
                      </FormInput>
                    );
                  }}
                />
              </FormControl>
              <Button
                data-cy="signUp_submit"
                type="submit"
                fullWidth
                variant="contained"
                color="info"
                sx={{
                  mt: 1,
                }}
              >
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
