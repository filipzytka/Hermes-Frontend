import ModalInput from "../ModalInput";

type Props = {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  emailChangeHandler: (input: string) => void;
};

const InvitationModalForm = ({ submitHandler, emailChangeHandler }: Props) => {
  return (
    <div className="mt-5">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-y-4">
          <div>
            <label className="block text-sm font-semibold ml-1 mb-3 dark:text-white text-gray-800">
              {"Search by email"}
            </label>
            <ModalInput onEmailChange={emailChangeHandler}></ModalInput>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="py-1 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold
                    bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    transition-all text-sm dark:focus:ring-offset-gray-800 max-w-20"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvitationModalForm;
