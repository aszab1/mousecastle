import { Link } from 'react-router-dom';
import PasswordMouse from '../../assets/images/writing-mouse1.jpg'

export default function Password() {
  return (
    <>
      <section id="password" className="flex flex-col gap-4 items-center justify-center p-4 overflow-y-auto">
        <img src={PasswordMouse} alt="image of Prince Magnus Mousecastle writing a letter"/>
        <h1 className='text-2xl'>How to Solve the Password</h1>
        <ul className='flex flex-col gap-4 w-5/6'>
          <li>Look at each clue like 1/5, which means take the 5th letter from your first answer.</li>
          <li>Collect all the letters needed to fill in the password.</li>
          <li>You can see all your answers by clicking on the home logo at the top.</li>
          <li>When you&apos;re done, press submit to see what to do next!</li>
        </ul>
        <Link 
        to='/submission'
        >
          <button className='bg-blue-100 py-4 px-16 rounded-md'>Submit</button>
        </Link>
      </section>
    </>
  )
}