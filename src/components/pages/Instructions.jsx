import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InstructionsImg from '../../assets/images/mates-mouses.jpg';
import { PrimaryButton } from './PrimaryButton';

export const Instructions = () => {

  const location = useLocation()
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const lang = queryParams.get('lang')
    if (lang) {
      i18n.changeLanguage(lang)
    }
  }, [location, i18n])


  return (
    <>
      <section id="instructions" className="flex flex-col gap-4 items-center justify-center min-h-screen px-4 py-8 md:px-8 lg:px-12 md:py-12">
        <img src={InstructionsImg} 
        alt="instructions-page-image" 
        className="w-full max-w-md mb-2 md:mb-6 lg:mb-8"
        />
        <h1 className="text-3xl italic bold text-center">{t('welcome')}</h1>
        <div className="welcome-text flex flex-col gap-2 md:gap-3 text-center">
        <p className="md:text-lg lg:text-xl">{t('intro1')}</p>
        <p className="md:text-lg lg:text-xl">{t('intro2')}</p>
        <p className="md:text-lg lg:text-xl">{t('clue')}</p>
        <p className="md:text-lg lg:text-xl">{t('hint')}</p>
        <p className='italic text-md md:text-lg lg:text-xl text-amber-500' style={{ fontWeight: 550 }} >{t('dessertHint')}</p>
        <p className="md:text-lg lg:text-xl">{t('goodLuck')}</p>
        </div>
        
        <PrimaryButton text={t('start')} onClick={() => navigate('/questions')}/>
      </section>
    </>
  )
}