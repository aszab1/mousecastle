import Hungarian from '../../assets/images/Hungarian-flag.png';
import English from '../../assets/images/GB-flag.png';
import German from '../../assets/images/German-flag.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export const SelectedLanguage = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const languageImages = {
    hu: Hungarian,
    en: English,
    de: German,
  };

  return (
    <>
      <img
        src={languageImages[currentLang]}
        alt="selected-language-flag"
        className="absolute top-4  right-4 size-6 rounded aspect-video"
        onClick={() => navigate('/')}
      />
    </>
  );
};
