// eslint-disable-next-line react/prop-types
export const AnswerBox = ({backgroundColor, borderColor, children}) => {
  return (
    <>
      <div 
      className="text-sm size-4 border-4 p-4 rounded-md flex items-center justify-center"
      style={{background: backgroundColor, borderColor: borderColor}}
      >
        {children}
      </div>
    </>
  );
};
