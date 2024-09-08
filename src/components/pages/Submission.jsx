import { useNavigate } from 'react-router-dom';
import farewellMouse from '../../assets/images/bandw-mouse.jpg';
import mouse from '../../assets/images/mouse1-nobg.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { PrimaryButton } from './PrimaryButton';
import Signature from '../../assets/images/signature.png';
import Logo1 from '../../assets/images/tourinform.jpg';
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

  useEffect(() => {
    const savedPassword = sessionStorage.getItem(storageKey)
    setPassword(savedPassword || '')

    const passwordData = Passwords.find((p) => p.lang === currentLang)
    if (passwordData) {
      const isCorrect =
      savedPassword === passwordData.pass || savedPassword === passwordData.pass1
      setIsPasswordCorrect(isCorrect)
    }
  }, [storageKey, currentLang]);

  const handleChangePassword = () => {
    // Clear session storage and reset password input fields on the Password page
    sessionStorage.removeItem(storageKey)
    navigate('/questions#solve-password')
  };

  return (
    <>
      <section id="submission" className="flex flex-col gap-3 items-center text-center h-full">
        <div className="logos flex w-full justify-start fixed top-4 left-4">
          <img src={Logo3} alt="" className="size-14" />
          {/* <img src={Logo1} alt="" className="size-16" /> */}
        </div>
        <SelectedLanguage/>

        {isPasswordCorrect ? ( 
          <>

<h1 className="mt-20 text-lg">{t('pwdConfimation')}</h1>
            <div className="password-display w-full text-center rounded py-4 font-bold text-2xl border-4 min-h-16 border-amber-400 bg-slate-100">
              {password ? (
                <p className="text-green-700">{password}</p>
              ) : (
                <p className="italic text-sm text-slate-400 font-light">...missing password...</p>
              )}
            </div>
            <h1 className="mt-4">{t('congrats')}</h1>
            <p>{t('goToTourinform')}</p>
            <p>{t('goToNostalgia')}</p>
            <img src={Logo2} alt="Logo Nostalgia" className="mt-4" />
            <img
              src={farewellMouse}
              alt="image of Prince Magnus Mousecastle"
              className="w-64 mt-6 aspect-auto"
            />
            <p className="mt-4">{t('farewell')}</p>
            <p>{t('bye')}</p>
            <img src={Signature} alt="signature" className="-rotate-12 w-60 py-2" />
          </>
        ) : (
          <>
            <img
              src={mouse}
              alt="image of Prince Magnus Mousecastle"
              className="w-48 mt-24 mb-4 aspect-auto"
            />
            <h1 className="mt-4 text-lg">{t('pwdConfimation')}</h1>
            <div className="password-display w-full text-center rounded py-4 font-bold text-2xl border-4 min-h-16 border-amber-400 bg-slate-100">
              {password ? (
                <p className="text-red-700">{password}</p>
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
