/* eslint-disable react/prop-types */
export const DisplayOnlyBox = ({ backgroundColor, borderColor, children }) => {
  return (
    <>
      <div
        className="text-sm size-4 border-4 p-3 rounded-md flex items-center justify-center"
        style={{ background: backgroundColor, borderColor: borderColor }}
      >
        {children}
      </div>
    </>
  )
}

export const InputBox = ({ color, inputRef, onChange, onKeyDown, value, size }) => {
  return (
    <div className="flex flex-col items-center justify-center h-fit">
      <label>{color.codeLocation}</label>
      <input
        type="text"
        maxLength={1}
        inputMode="text"
        autoCapitalize="on"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className={`border-4 rounded-md aspect-square text-center text-lg font-bold size-${size}`}
        style={{
          backgroundColor: color.bg_clr_code,
          borderColor: color.bg_border_code,
        }} 
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      />
    </div>
  )
}