type Props = {
  handler: () => void;
};

const ModalBody = ({ handler }: Props) => {
  return (
    <div>
      <p>Are you sure you want to remove selected records?</p>
      <div className="mt-3">
        <button
          onClick={handler}
          type="submit"
          className="py-1 px-4 inline-flex justify-center items-center gap-2 rounded-md
               border border-transparent font-semibold
              bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ModalBody;
