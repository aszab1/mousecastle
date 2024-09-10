import Hungarian from '../../assets/images/Hungarian-flag.png';
import English from '../../assets/images/GB-flag.png';
import German from '../../assets/images/German-flag.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export const SelectedLanguage = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const languageImages = {
    hu: Hungarian,
    en: English,
    de: German,
  };

  return (
    <div className="absolute top-2 right-2 md:right-20 lg:right-36  z-10">
      <p className="italic text-[10px] text-right">{t('home')}</p>
      <img
        src={languageImages[currentLang]}
        alt="selected-language-flag"
        className="h-4 rounded aspect-video cursor-pointer"
        onClick={() => navigate('/')}
      />
      
    </div>
  );
};
