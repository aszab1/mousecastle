import Logo from '../../assets/images/museum-logo1.png'

export const Nav = () => {
  return (
    <nav className="absolute top-12">
      <img src={Logo} alt="museum-logo" className="w-50 aspect-auto" />
    </nav>
  )
}
