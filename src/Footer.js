import { Link } from 'react-router-dom';
import facebook from './assets/images/facebook.png';
import instagram from './assets/images/instagram.png';

function Footer() {
  return (<footer>
    <div className="footercolumn">
      <h3>Contact Us</h3>
      <p>Phone: +1 435 343 2323</p>
      <p>Email: info@littlemon.com</p>
    </div>
    <div className="footercolumn">
      <h3>Stay in Touch</h3>
      <Link to="http://www.facebook.com"><img className="socialimage" src={facebook} alt="Facebook Icon" /></Link>
      <Link to="http://www.instagram.com"><img className="socialimage" src={instagram} alt="Instagram Icon" /></Link>
    </div>
    <div className="footercolumn">
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/booking">Reservations</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order">Order Online</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  </footer>);
}

export default Footer;