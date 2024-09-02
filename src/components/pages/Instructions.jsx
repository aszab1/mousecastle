import { Link } from 'react-router-dom';
import InstructionsImg from '../../assets/images/mates-mouses.jpg'

export const Instructions = () => {
  return (
    <>
      <section id="instructions" className="flex flex-col gap-8 h-full items-center justify-center">
        <img src={InstructionsImg} alt="instructions-page-image"/>
        <h1 className='text-2xl'>Here&apos;s how this works</h1>
        <ul className='flex flex-col gap-4 w-5/6'>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
        <Link 
        to='/questions'
        >
          <button className='bg-blue-100 py-4 px-16 rounded-md'>Start</button>
        </Link>
      </section>
    </>
  );
};
