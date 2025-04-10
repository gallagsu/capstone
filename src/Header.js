import Nav from "./Nav";
import logo from './assets/images/Logo.svg';
import { Link } from 'react-router-dom';

function Header() {
    return (
      <header>
          <Link to="/">
          <img src={logo} alt="Little Lemon Logo" width="200px" />
          </Link>
          <Nav/>
      </header>  
    );
  }
  
  export default Header;