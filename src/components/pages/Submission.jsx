import { Link } from 'react-router-dom'
import farewellMouse from '../../assets/images/bandw-mouse.jpg'
import { PrimaryButton } from './PrimaryButton'

export default function Submission() {


  return (
    <>
    <section id="submission" className="flex flex-col gap-4 items-center justify-center p-4 overflow-y-auto">
      <h1>Your Password is:</h1>
      <p>Don&apos;t think it&apos;s right?</p>
      <Link
        to='/questions'
        className='w-full'
      >
        <PrimaryButton text={'Change Password'}/>
      </Link>
      <p>Else..</p>
      <h1>Congratulations on solving the riddle and discovering the password!</h1>
      <p>Go straight to the Tourinform Office to collect your prize!</p>
      <p>Also, visit the Nostalgiafoto shop!</p>
        <img src={farewellMouse} alt="image of Prince Magnus Mousecastle"/>
        <div className="flex flex-col items-center justify-center">
        <p>Please visit us again!</p>
        <p>Bye Bye!</p>
        </div>
        <p>Prince Magnus Mousecastle</p>
</section>
    </>
  )
}