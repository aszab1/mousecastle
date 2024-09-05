/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export const DisplayOnlyBox = ({ backgroundColor, borderColor, children }) => {
  return (
    <>
      <div
        className="text-sm size-4 border-4 p-4 rounded-md flex items-center justify-center"
        style={{ background: backgroundColor, borderColor: borderColor }}
      >
        {children}
      </div>
    </>
  );
};

export const PasswordBox = ({ code, inputRef, onChange, value }) => {
  return (
    <div className='flex flex-col items-center'>
      <label>
        {code.codeLocation}
      </label>
      <input
        type="text"
        maxLength={1}
        autoCapitalize="on"
        className="border-4 rounded-md size-12 aspect-square text-center text-lg font-bold"
        style={{
          backgroundColor: code.colorCode,
          borderColor: code.borderColorCode,
        }}
        ref={inputRef}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
