import Logo from "../../assets/argentBankLogo.png";
import './nav.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  // Vérifie d'abord localStorage, sinon prend sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.reload(); // Recharge la page pour mettre à jour l'affichage
  };

  const userProfile = useSelector((state) => state.userProfile.profile);

  return (
    <nav className="nav">
      <a href="/">
        <img className='logo' src={Logo} alt="ArgentBankLogo" />
      </a>
      {token ? (
        <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
          <div className="logout">
            {userProfile?.firstName || ''}
            <i className="fa fa-sign-out"></i>
            Sign Out
          </div>
        </NavLink>
      ) : (
        <NavLink className="main-nav-item" to="/signin">
          <div className="login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </div>
        </NavLink>
      )}
    </nav>
  );
};

export default Nav;
