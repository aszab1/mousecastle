/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import PasswordMouse from '../../assets/images/writing-mouse1.jpg';
import { Passwords } from '../../assets/questions';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from './PrimaryButton';
import { InputBox } from './InputBoxes';

export default function Password() {
  const inputRefs = useRef([])
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const navigate = useNavigate()
  const storageKey = `password-input-${currentLang}`

  const passwordData = Passwords.find((password) => password.lang === currentLang)

  const [passwordInput, setPasswordInput] = useState(() => {
    const savedPassword = sessionStorage.getItem(storageKey)
    return savedPassword ? savedPassword.replace(/\s/g, '').split('') : Array(passwordData?.codes.length).fill('')
  })

  const formatPassword = (input) => {
    const joinedInput = input.join('')
    if (currentLang === 'en') {
      return `${joinedInput.slice(0, 6)} ${joinedInput.slice(6)}`
    }
    else if (currentLang === 'hu') {
      return `${joinedInput.slice(0, 5)} ${joinedInput.slice(5)}`
    } else {
      return joinedInput
    }
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newPasswordInput = [...passwordInput];

    if (value) {
      // Add character and move to the next box
      newPasswordInput[index] = value.toUpperCase();
      setPasswordInput(newPasswordInput);
      sessionStorage.setItem(storageKey, formatPassword(newPasswordInput));

      if (value.length === 1 && index < passwordData.codes.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      // Handle backspace and move to the previous box
      newPasswordInput[index] = ''
      setPasswordInput(newPasswordInput)
      sessionStorage.setItem(storageKey, formatPassword(newPasswordInput))

      if (index > 0) {
        inputRefs.current[index - 1].focus()
      }
    }
  }

  // Reset password input state on component mount to prevent extra input field issues if changePwdBtn clicked on Submission page
  useEffect(() => {
    // Reset the state each time the password page is visited
    const savedPassword = sessionStorage.getItem(storageKey)
    const cleanedPassword = savedPassword ? savedPassword.replace(/\s/g, '').split('') : Array(passwordData?.codes.length).fill('')
    setPasswordInput(cleanedPassword)
  }, [storageKey, passwordData?.codes.length])



  return (
    <>
      <section id="password" className="flex flex-col gap-4 items-center justify-between h-full">
        <img src={PasswordMouse} alt="image of Prince Magnus Mousecastle writing a letter" />
        <div className="flex flex-col gap-4 text-center mb-auto">
          <h1 className="text-2xl">{t('howTo')}</h1>
          <p>{t('pwdExplanation1')}</p>
          <p>{t('pwdExplanation2')}</p>
        </div>
        <div className="password-boxes flex flex-wrap gap-4 justify-center h-fit">
          {passwordData && passwordData.codes.map((code, index) => (
              <InputBox 
              size={12}
              key={index}
              color={code}
              inputRef={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
              onChange={(e) => handleInputChange(e, index)} // Handle input change
              value={passwordInput[index] || ''}
              />
          ))}
        </div>
        <p className="text-center">{t('pwdExplanation3')}</p>
        <PrimaryButton text={t('submit')} onClick={() => navigate('/submission')}/>
      </section>
    </>
  )
}

