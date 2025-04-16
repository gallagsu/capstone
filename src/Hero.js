import heroimage from './assets/images/restauranfood.jpg';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero-row">
      <div className="hero1">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focussed on traditional recipes served with a modern twist.</p>
        <Link to="/booking"><button>Reserve a Table</button></Link>
      </div>

      <div className="hero2">
        <img className="heroimage" src={heroimage} />
      </div>
    </section>
  );
}

export default Hero;