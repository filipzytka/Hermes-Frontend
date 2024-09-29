import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { popUp } from "../../utils/Popup";
import { generateToken } from "../../api/token";
import { FaAddressBook } from "react-icons/fa";
import { useForm } from "@tanstack/react-form";
import FormControl from "@mui/material/FormControl/FormControl";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import FormInput from "../FormInput";

type Props = {
  isShowing: boolean;
  onSend: (username: string, token: string) => void;
  onClose: () => void;
};

const InvitationModal = ({ isShowing, onSend, onClose }: Props) => {
  const { email } = useAuth();
  const { mutateAsync: generateTokenMutate } = useMutation({
    mutationKey: ["generateToken"],
    mutationFn: async () => {
      return generateToken(email);
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: (data) => {
      handleEmailSending(data.value.email);
    },
  });

  const handleEmailSending = async (email: string) => {
    const response = await generateTokenMutate();
    const generatedToken = response.data.token;

    onSend(email, generatedToken!);

    popUp("Invitation has been sent successfully", "success");
    onClose();
  };

  if (!isShowing) {
    return;
  }

  return ReactDOM.createPortal(
    <>
      <InvitationModalWrapper>
        <CloseButton handler={onClose} />
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            padding: 2,
          }}
        >
          <InvitationModalHeader />
          <FormControl fullWidth>
            <h2 className="my-1">Email</h2>

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
                    placeholder="your@email.com"
                  >
                    {field.state.meta.errors && (
                      <div
                        data-cy="error-submit-email"
                        className="text-red-500 text-sm mt-1"
                      >
                        {field.state.meta.errors}
                      </div>
                    )}
                  </FormInput>
                );
              }}
            />
          </FormControl>
          <Button
            data-cy="inv-button-send"
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            sx={{
              mt: 1,
            }}
          >
            Send
          </Button>
        </Box>
      </InvitationModalWrapper>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

type CloseBtnProps = {
  handler: () => void;
};

const CloseButton = ({ handler }: CloseBtnProps) => {
  return (
    <div className="absolute right-4 top-4">
      <button onClick={handler}>
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

type InvitationModalWrapperProps = {
  children: ReactNode;
};

const InvitationModalWrapper = ({ children }: InvitationModalWrapperProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      <main
        id="content"
        role="main"
        className="fixed inset-0 flex justify-center items-center z-50"
      >
        <div className="relative mt-7  rounded-xl shadow-lg bg-gray-900 border-gray-700 px-5 py-5">
          {children}
        </div>
      </main>
    </>
  );
};

const InvitationModalHeader = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <FaAddressBook className="text-white  w-10 h-10" />
      </div>
      <h1 className="block text-2xl  text-white mt-2">
        Invite a collaborator to Hermes
      </h1>
    </>
  );
};

export default InvitationModal;
