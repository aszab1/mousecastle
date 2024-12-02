
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

  const [inputSize, setInputSize] = useState(window.innerWidth > 768 ? 12 : 10)


  useEffect(() => {
    const handleResize = () => {
      setInputSize(window.innerWidth > 768 ? 12 : 10)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
  // console.log("Formatted password:", formatPassword(passwordInput))

  const handleInputChange = (e, index) => {
    const { value } = e.target
    const newPasswordInput = [...passwordInput]

    if (value) {
      // Add character and move to the next box
      newPasswordInput[index] = value.toUpperCase()
      setPasswordInput(newPasswordInput)
      sessionStorage.setItem(storageKey, formatPassword(newPasswordInput))

      if (value.length === 1 && index < passwordData.codes.length - 1) {
        inputRefs.current[index + 1].focus()
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

  // console.log("Saved password:", sessionStorage.getItem(storageKey))

  return (
    <>
      <section id="password" className="flex flex-col gap-4 items-center justify-between min-h-screen p-1">
        <div className="w-full max-w-md">
        <img src={PasswordMouse} alt="image of Prince Magnus Mousecastle writing a letter" 
        className="w-full h-auto rounded-lg shadow-md mb-6"/>
        <div className="text-center mb-6">
          <h1 className="text-xl" style={{ fontWeight: 550 }}>{t('howTo')}</h1>
          <p className="mt-5 mb-4">{t('pwdExplanation1')}</p>
          <p >{t('pwdExplanation2')}</p>
        </div>
        </div>
        <div className="password-boxes flex flex-wrap gap-2 justify-center mb-2">
          {passwordData && passwordData.codes.map((code, index) => (
              <InputBox 
              size={inputSize}
              key={index}
              color={code}
              inputRef={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
              onChange={(e) => handleInputChange(e, index)} // Handle input change
              value={passwordInput[index] || ''}
              />
          ))}
        </div>
        <div className="w-full max-w-md text-center">
        <p className="w-full max-w-md text-center mb-6">{t('pwdExplanation3')}</p>
        <PrimaryButton text={t('submit')} onClick={() => navigate('/submission')} className="mb-5"/>
        </div>
      </section>
    </>
  )
}

