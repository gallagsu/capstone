import burgermenu from './assets/images/icon _hamburger menu.svg';
import { NavLink } from "react-router-dom";

function Nav() {
    return <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>About</NavLink></li>
                    <li><NavLink to="/booking" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Reservations</NavLink></li>
                    <li><NavLink to="/menu" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Menu</NavLink></li>
                    <li><NavLink to="/order" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Order Online</NavLink></li>
                    <li><NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Login</NavLink></li>
                </ul>

                <div className="burgermenu">
                    <img src={burgermenu} alt="burger menu icon"></img>
                </div>
            </nav>;
  }
  
  export default Nav;