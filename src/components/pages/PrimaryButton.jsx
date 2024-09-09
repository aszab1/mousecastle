// eslint-disable-next-line react/prop-types
export const PrimaryButton = ({ text, onClick, style, className }) => {
  return (
    <button
      className={`text-md bg-amber-400 py-4 w-full 
        md:w-auto md:px-8 md:text-lg lg:px-10 lg:text-xl
        my-auto rounded active:bg-amber-950 active:text-white font-bold mb-5 
        ${style} ${className}
        `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
