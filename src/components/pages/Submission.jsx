import { useNavigate } from 'react-router-dom';
import farewellMouse from '../../assets/images/bandw-mouse.jpg';
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { PrimaryButton } from './PrimaryButton';

export default function Submission() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language
  const storageKey = `password-input-${currentLang}`

  const [password, setPassword] = useState('')

  useEffect(() => {
    const savedPassword = sessionStorage.getItem(storageKey)
    setPassword(savedPassword || '')
  }, [storageKey])

  const handleChangePassword = () => {
    // Clear session storage and reset password input fields on the Password page
    sessionStorage.removeItem(storageKey)
    navigate('/questions#solve-password')
  }



  return (
    <>
      <section id="submission" className="flex flex-col gap-4 items-center justify-center p-4 overflow-y-auto">
        <h1>{t('pwdConfimation')}</h1>
        {password && <p>{password}</p>}
        <p className="text-sm italic">{t('submissionQ')}</p>
        <PrimaryButton text={t('changePwdBtn')} onClick={handleChangePassword} />
        <h1>{t('congrats')}</h1>
        <p>{t('goToTourinform')}</p>
        <p>{t('goToNostalgia')}</p>
        <img src={farewellMouse} alt="image of Prince Magnus Mousecastle" />
        <div className="flex flex-col items-center justify-center">
          <p>{t('farewell')}</p>
          <p>{t('bye')}</p>
        </div>
        <p>{t('magnus')}</p>
      </section>
    </>
  );
}
