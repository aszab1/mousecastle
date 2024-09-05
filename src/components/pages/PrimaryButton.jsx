// eslint-disable-next-line react/prop-types
export const PrimaryButton = ({ text, onClick, style }) => {
  return (
    <button
      className={`text-md bg-amber-400 py-4 w-full my-auto rounded active:bg-amber-950 active:text-white font-bold ${style} `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
