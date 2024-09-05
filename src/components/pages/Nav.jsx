import Logo from '../../assets/images/museum-logo.jpg'

export const Nav = () => {
  return (
    <nav className="absolute top-12">
      <img src={Logo} alt="museum-logo" className="w-48 aspect-auto" />
    </nav>
  );
};
