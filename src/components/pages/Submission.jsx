import { useNavigate } from 'react-router-dom';
import farewellMouse from '../../assets/images/bandw-mouse.jpg';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { PrimaryButton } from './PrimaryButton';
import Signature from '../../assets/images/signature.png';
import Logo1 from '../../assets/images/tourinform.jpg';
import Logo2 from '../../assets/images/museum-logo1.png';
import Logo3 from '../../assets/images/favicon.jpg';

export default function Submission() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language;
  const storageKey = `password-input-${currentLang}`;

  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedPassword = sessionStorage.getItem(storageKey);
    setPassword(savedPassword || '');
  }, [storageKey]);

  const handleChangePassword = () => {
    // Clear session storage and reset password input fields on the Password page
    sessionStorage.removeItem(storageKey);
    navigate('/questions#solve-password');
  };

  return (
    <>
      <section id="submission" className="flex flex-col gap-3 items-center text-center h-full">
        <div className="logos flex w-full justify-start fixed top-4 left-4">
          <img src={Logo3} alt="" className="size-16" />
          <img src={Logo1} alt="" className="size-16" />
        </div>
        <img src={farewellMouse} alt="image of Prince Magnus Mousecastle" className="w-64 aspect-auto" />
        <h1 className="text-lg">{t('pwdConfimation')}</h1>

        <div className="password-display w-full text-center rounded py-4 font-bold text-2xl border-4 min-h-16 border-amber-400 bg-slate-100">
          {password ? <p>{password}</p> : <p className='italic text-sm text-slate-400 font-light'>...missing password...</p>}
        </div>
        <h1>{t('congrats')}</h1>
        <p>{t('goToTourinform')}</p>
        <p>{t('goToNostalgia')}</p>
        <div className="flex flex-col items-center justify-center">
          <p>{t('farewell')}</p>
          <p>{t('bye')}</p>
        </div>
        <img src={Signature} alt="signature" className="-rotate-12 w-60 py-2" />

        <div className="change-password w-full flex flex-col gap-2 my-auto">
          <p className="italic">{t('submissionQ')}</p>
          <PrimaryButton text={t('changePwdBtn')} onClick={handleChangePassword} style={'my-0'} />
        </div>
      </section>
    </>
  );
}
