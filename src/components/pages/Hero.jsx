import HeroImage from '../../assets/images/welcome-mouse-pic.jpg'
import English from '../../assets/images/GB-flag.png'
import German from '../../assets/images/German-flag.png'
import Hungarian from '../../assets/images/Hungarian-flag.png'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <>
      <section id="hero" className="flex flex-col gap-8 h-full items-center justify-center">
        <img src={HeroImage} alt="hero-image" />
        <h1>Choose language to start:</h1>
        <div className="languages flex gap-8">
          <Link 
          to='/instructions?lang=en'>
            <img
              className="w-16 h-full rounded-md hover:scale-105 transition-all duration-300"
              src={English}
              alt="select-english"
            />
          </Link>
          <Link to='/instructions?lang=de'>
            <img
              className="w-16 h-full rounded-md hover:scale-105 transition-all duration-300"
              src={German}
              alt="select-german"
            />
          </Link>
          <Link to='/instructions?lang=hu'>
            <img
              className="w-16 h-full rounded-md hover:scale-105 transition-all duration-300"
              src={Hungarian}
              alt="select-german"
            />
          </Link>
        </div>
      </section>
    </>
  )
}
