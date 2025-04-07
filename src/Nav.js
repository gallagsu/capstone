import burgermenu from './assets/images/icon _hamburger menu.svg';

function Nav() {
    return <nav>
                <ul>
                    <li><a>Home</a></li>
                    <li><a>About</a></li>
                    <li><a>Menu</a></li>
                    <li><a>Reservations</a></li>
                    <li><a>Order Online</a></li>
                    <li><a>Login</a></li>
                </ul>

                <div className="burgermenu">
                    <img src={burgermenu}></img>
                </div>
            </nav>;
  }
  
  export default Nav;