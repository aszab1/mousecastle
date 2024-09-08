import { useNavigate } from 'react-router-dom';
import farewellMouse from '../../assets/images/bandw-mouse.jpg';
import mouse from '../../assets/images/mouse1-nobg.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { PrimaryButton } from './PrimaryButton';
import tourinform from '../../assets/images/t-godollo.png';
import Logo2 from '../../assets/images/Nostalgiafoto.png';
import Logo3 from '../../assets/images/favicon.jpg';
import { Passwords } from '../../assets/questions';
import { SelectedLanguage } from './SelectedLanguage';

export default function Submission() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const currentLang = i18n.language
  const storageKey = `password-input-${currentLang}`

  const [password, setPassword] = useState('')
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const [signatureText, setSignatureText] = useState('')

  useEffect(() => {
    const savedPassword = sessionStorage.getItem(storageKey)
    setPassword(savedPassword || '')

    const passwordData = Passwords.find((p) => p.lang === currentLang)
    if (passwordData) {
      const isCorrect =
        savedPassword === passwordData.pass || savedPassword === passwordData.pass1
      setIsPasswordCorrect(isCorrect)
    }

    // Signature animation

    const magnusText = t('magnus') || ''
    // console.log('magnusText:', magnusText)
    setSignatureText('')
    let index = 0
    if (magnusText.length > 0) {
      const interval = setInterval(() => {
        if (index < magnusText.length) {
          setSignatureText(magnusText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval) // Clear the interval when done
        }
      }, 150) // Adjust the speed of the typing effect

      return () => clearInterval(interval) // Clean up on component unmount
    }

  }, [storageKey, currentLang, t])



  const handleChangePassword = () => {
    // Clear session storage and reset password input fields on the Password page
    sessionStorage.removeItem(storageKey)
    navigate('/questions#solve-password')
  }

  const replaceWordWithLogo = (text, word, logo) => {
    const parts = text.split(word)
    return (
      <>
        {parts[0]}
        <img src={logo} alt={`${word} logo`} className="inline h-6 mx-1" />
        {parts[1]}
      </>
    )
  }

  return (
    <>
      <section id="submission" className="flex flex-col gap-3 items-center text-center h-full">
        <div className="absolute top-1 left-2">
          <img src={Logo3} alt="" className="size-10" />
        </div>
        <SelectedLanguage />

        {isPasswordCorrect ? (
          <>

            <h1 className="mt-4 text-lg">{t('pwdConfimation')}</h1>
            <div className="password-display w-auto max-w-md text-center py-3 px-10 font-bold text-xl border-4 min-h-16 border-amber-400 bg-gradient-to-r from-amber-50 to-amber-100 shadow-md mx-auto">
              {password ? (
              <p className="text-amber-900">{password}</p>
            ) : (
              <p className="italic text-sm text-slate-400 font-light">...missing password...</p>
            )}
            </div>
            <h1 className="mt-2">{t('congrats')}</h1>
            <p className="flex items-center justify-center flex-wrap">
              {replaceWordWithLogo(t('goToTourinform'), 'Tourinform', tourinform)}
            </p>
            <p className="flex items-center justify-center flex-wrap">
              {replaceWordWithLogo(t('goToNostalgia'), 'Nostalgiafoto', Logo2)}
            </p>
            <img
              src={farewellMouse}
              alt="image of Prince Magnus Mousecastle"
              className="w-48 aspect-auto"
            />
            <p>{t('farewell')}</p>
            <div>
              <p>{t('bye')}</p>
              {/* Signature animation */}
              <p
                // className="text-amber-900"
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  transform: 'rotate(-15deg)',
                  display: 'inline-block',
                  fontWeight: '200',
                  fontSize: '1.2rem',
                  marginLeft: '5.5em',
                  
                }}
              >
                {signatureText}
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src={mouse}
              alt="image of Prince Magnus Mousecastle"
              className="w-48 mt-14 mb-4 aspect-auto"
            />
            <h1 className="mt-4 text-lg">{t('pwdConfimation')}</h1>
            <div className="password-display w-full text-center rounded py-4 font-bold text-2xl border-4 min-h-16 border-amber-400 bg-slate-100">
              {password ? (
                <p className="text-rose-800">{password}</p>
              ) : (
                <p className="italic text-sm text-slate-400 font-light">...missing password...</p>
              )}
            </div>
            <p className="italic mt-8">{t('submissionQ')}</p>
            <PrimaryButton
              text={t('changePwdBtn')}
              onClick={handleChangePassword}
              style={'my-0 mt-2'}
            />
          </>
        )}
      </section>
    </>
  )
}
