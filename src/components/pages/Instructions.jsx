import { Link } from 'react-router-dom';
import InstructionsImg from '../../assets/images/mates-mouses.jpg';

export const Instructions = () => {
  return (
    <>
      <section id="instructions" className="flex flex-col gap-8 h-full items-center justify-center">
        <img src={InstructionsImg} alt="instructions-page-image" />
        <h1 className="text-4xl italic bold">Welcome!</h1>
        <div className="welcome-text flex flex-col gap-4 text-center bold">
          <p>My name is Prince Magnus</p>
          <p>Mousecastle, the Governer of The Royal Palace.</p>
          <p> Today you can explore some of the secrets of my palace if you find the 7 game boxes upstairs.</p>
          <p>
            If you solve the riddle and discover the password, you can collect your prize in the Tourinform Office!
          </p>
          <p> I can help you with a clue to the password:</p>
          <p className='italic text-md text-amber-500'> It&apos;s my friend, Count Chester Gorgonzola&apos;s favorite dessert! </p>
          <p>Good luck and have fun!</p>
        </div>
        <Link to="/questions">
          <button className="bg-amber-500 py-4 px-16 rounded-md">Start</button>
        </Link>
      </section>
    </>
  );
};