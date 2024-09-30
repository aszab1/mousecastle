import { useNavigate } from 'react-router-dom';
import farewellMouse from '../../assets/images/bandw-mouse.jpg';
import mouse from '../../assets/images/mouse1-nobg.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { PrimaryButton } from './PrimaryButton';
import tourinform from '../../assets/images/t-godollo.png';
import Logo2 from '../../assets/images/Nostalgiafoto.png';
import Logo3 from '../../assets/images/favicon1.jpg';
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

  // const replaceWordWithLogo = (text, word, logo) => {
  //   const parts = text.split(word)
  //   return (
  //     <>
  //       {parts[0]}
  //       <img src={logo} alt={`${word} logo`} className="inline h-6 mx-1" />
  //       {parts[1]}
  //     </>
  //   )
  // }


  return (
    <>
      <section id="submission" className="flex flex-col gap-3 items-center text-center h-full">
        <div className="absolute top-1 left-2 md:left-10 lg:left-24">
          <img src={Logo3} alt="" className="size-10" />
        </div>
        <SelectedLanguage />

        {isPasswordCorrect ? (
          <>

            <h1 className="mt-4 text-lg md:text-xl">{t('pwdConfimation')}</h1>
            <div className="password-display w-auto max-w-md text-center py-2 px-6 font-bold text-lg border-4 min-h-14 border-amber-400 bg-gradient-to-r from-amber-50 to-amber-100 shadow-md mx-auto">

              {password ? (
                <p className="text-amber-900">{password}</p>
              ) : (
                <p className="italic text-sm text-slate-400 font-light">{t('missingPw')}</p>
              )}
            </div>
            <h1 className="mt-2 md:text-xl">{t('congrats')}</h1>
            <p className="flex md:text-xl items-center justify-center flex-wrap ">
              {/* {replaceWordWithLogo(t('goToTourinform'), 'Tourinform', tourinform)} */}
              {t('goToTourinform')}
              <img style={{width: '80px'}} src={tourinform} alt="logo of Tourinform Gödöllő" />
        
            </p>
            <p className="flex md:text-xl items-center justify-center flex-wrap space-x-2">
              {/* {replaceWordWithLogo(t('goToNostalgia'), 'Nostalgiafoto', Logo2)} */}
              {t('goToNostalgia')}
               <img style={{width: '80px'}} src={Logo2} alt="logo of Nosztalgiafotó" />
            </p>
            
            <img
              src={farewellMouse}
              alt="image of Prince Magnus Mousecastle"
              className="w-48 md:w-56 lg:w-64 aspect-auto"
            />
            <p className=" md:text-xl">{t('farewell')}</p>
            <div>
              <p className=" md:text-xl">{t('bye')}</p>
              {/* Signature animation */}
              <p
                className="text-amber-900"
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  transform: 'rotate(-19deg)',
                  display: 'inline-block',
                  fontWeight: '500',
                  fontSize: '1.3rem',
                  marginLeft: '5em',

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
            <div className="password-display w-auto max-w-md text-center rounded py-4 px-10 font-bold text-lg border-4 min-h-14 border-amber-400 bg-slate-100 mx-auto">
              {password ? (
                <p className="text-rose-800">{password}</p>
              ) : (
                <p className="italic text-sm text-slate-400 font-light">{t('missingPwd')}</p>
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
