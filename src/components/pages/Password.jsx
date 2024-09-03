/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import PasswordMouse from '../../assets/images/writing-mouse1.jpg';
import { Passwords } from '../../assets/questions';
import { useRef } from 'react';

export default function Password() {
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    if (value.length === 1 && index < Passwords[0].codes.length - 1) {
      // Move focus to the next input field
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <>
      <section id="password" className="flex flex-col gap-4 items-center justify-between h-full">
        <img src={PasswordMouse} alt="image of Prince Magnus Mousecastle writing a letter" />
        <div className="flex flex-col gap-4 text-center mb-auto">
          <h1 className="text-2xl">How to Solve the Password</h1>
          <p>Look at each clue like 1/5, which means take the 5th letter from your answer to the first question.</p>
          <p>Collect all the letters needed to fill in the password.</p>
        </div>
        <div className="password-boxes h-full flex flex-wrap gap-2 justify-center">
          {Passwords[0].codes.map((code, index) => (
            <div className="single-box flex flex-col gap-0 items-center" key={index}>
              <label htmlFor="" className="italic text-sm">
                {code.codeLocation}
              </label>
              <input
                type="text"
                id={`input-${index}`}
                maxLength={1}
                autoCapitalize="on"
                className="border-4 rounded-md size-12 aspect-square text-center text-lg font-bold"
                style={{
                  backgroundColor: code.colorCode,
                  borderColor: code.borderColorCode,
                }}
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                onChange={(e) => handleInputChange(e, index)} // Handle input change
              />
            </div>
          ))}
        </div>
        <p className="text-center">When you&apos;re done, press submit to see what to do next!</p>
        <Link to="/submission" className="flex flex-col items-center text-center gap-4">
          <button className="bg-blue-100 py-4 px-16 rounded-md">Submit</button>
        </Link>
      </section>
    </>
  );
}
