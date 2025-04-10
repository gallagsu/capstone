import burgermenu from './assets/images/icon _hamburger menu.svg';
import { Link } from 'react-router-dom';

function Nav() {
    return <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/booking">Reservations</Link></li>
                    <li><Link to="/order">Order Online</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>

                <div className="burgermenu">
                    <img src={burgermenu} alt="burger menu icon"></img>
                </div>
            </nav>;
  }
  
  export default Nav;