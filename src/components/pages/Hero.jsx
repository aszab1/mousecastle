import HeroImage from '../../assets/images/welcome-mouse-pic.jpg';
import English from '../../assets/images/GB-flag.png';
import German from '../../assets/images/German-flag.png';
import Hungarian from '../../assets/images/Hungarian-flag.png';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { Nav } from './Nav.jsx';

export const Hero = () => {
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    i18next.changeLanguage(lang);

    localStorage.setItem('language', lang);
    sessionStorage.clear();
    navigate('/instructions');
  };

  return (
    <>
      <section id="hero" className="flex flex-col gap-8 h-full items-center justify-center">
        <Nav />
        <img src={HeroImage} alt="hero-image" />
        <h1>Válassz nyelvet a kezdéshez:</h1>
        <div className="languages flex gap-8">
          <img
            className="w-16 h-full rounded-md hover:scale-105 transition-all duration-300"
            src={Hungarian}
            alt="select-hungarian"
            onClick={() => handleLanguageChange('hu')}
          />
          <img
            className="w-16 h-full rounded-md hover:scale-105 transition-all duration-300"
            src={English}
            alt="select-english"
            onClick={() => handleLanguageChange('en')}
          />

          <img
            className="w-16 h-full rounded-md hover:scale-105 transition-all duration-300"
            src={German}
            alt="select-german"
            onClick={() => handleLanguageChange('de')}
          />
        </div>
      </section>
    </>
  );
};
