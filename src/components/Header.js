import logo from '../images/header/logo.svg';

const Header = () => {
return (
<div className="header">
<img src={logo} alt="логотип" className="header__logo" />
</div>
)
}

export default Header;