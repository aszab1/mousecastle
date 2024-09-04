// eslint-disable-next-line react/prop-types
export const PrimaryButton = ({ text }) => {
  return (
    <button className="text-md bg-amber-400 py-4 w-full my-auto rounded active:bg-amber-950 active:text-white">
      {text}
    </button>
  );
};
