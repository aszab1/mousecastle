import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import InstructionsImg from '../../assets/images/mates-mouses.jpg';
import { PrimaryButton } from './PrimaryButton';

export const Instructions = () => {

  const location = useLocation()
  const { i18n, t } = useTranslation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const lang = queryParams.get('lang')
    if (lang) {
      i18n.changeLanguage(lang)
    }
  }, [location, i18n])


  return (
    <>
      <section id="instructions" className="flex flex-col gap-4 items-center justify-center max-h-full">
        <img src={InstructionsImg} alt="instructions-page-image" />
        <h1 className="text-4xl italic bold">{t('welcome')}</h1>
        <div className="welcome-text flex flex-col gap-2 text-center bold">
        <p>{t('intro1')}</p>
        <p>{t('intro2')}</p>
        <p>{t('clue')}</p>
        <p>{t('hint')}</p>
        <p className='italic text-md text-amber-500'>{t('dessertHint')}</p>
        <p>{t('goodLuck')}</p>
        </div>
        <Link to="/questions" className='w-full'>
        <PrimaryButton text={t('start')}/>
        </Link>
      </section>
    </>
  );
};