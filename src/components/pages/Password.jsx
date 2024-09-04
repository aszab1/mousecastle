/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import PasswordMouse from '../../assets/images/writing-mouse1.jpg';
import { Passwords } from '../../assets/questions';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Password() {
  const inputRefs = useRef([]);
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  console.log(currentLang)

  const passwordData = Passwords.find((password) => password.lang === currentLang)

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
          <h1 className="text-2xl">{t('howTo')}</h1>
          <p>{t('pwdExplanation1')}</p>
          <p>{t('pwdExplanation2')}</p>
        </div>
        <div className="password-boxes h-full flex flex-wrap gap-2 justify-center">
          {/* {Passwords[0].codes.map((code, index) => ( */}
          {passwordData && passwordData.codes.map((code, index) => (
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
        <p className="text-center">{t('pwdExplanation3')}</p>
        <Link to="/submission" className="flex flex-col items-center text-center gap-4">
          <button className="bg-blue-100 py-4 px-16 rounded-md">{t('submit')}</button>
        </Link>
      </section>
    </>
  );
}
