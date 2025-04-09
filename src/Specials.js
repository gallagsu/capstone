import greek from './assets/images/greek salad.jpg';
import bruschetta from './assets/images/bruchetta.svg';
import lemon from './assets/images/lemon dessert.jpg';

function Specials() {
    return (
        <>
        <section className="specials-header">
        <div className="specials1">
         <h1 className="specialtitle">This week's specials</h1>
        </div>
        <div className="specials2">
         <button class = "onlinemenu">Online Menu</button>
        </div>
      </section>
      
      <section className="specials">
          <div className="special">
            <img className="specialimage" src={greek} />
            <div className="specialdetails">
              <h3 className="cardtitle">Greek Salad</h3>
              <p className="highlight">€14.00</p>
              <p className="specialtext">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
              <p className="lead">Order a Delivery</p>
            </div>
          </div>
          <div className="special">
            <img className="specialimage" src={bruschetta} />
            <div className="specialdetails">
              <h3 className="cardtitle">Bruschetta</h3>
              <p className="highlight">€11.00</p>
              <p className="specialtext">Our bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
              <p className="lead">Order a Delivery</p>
            </div>
          </div>
          <div className="special">
            <img className="specialimage" src={lemon} />
            <div className="specialdetails">
              <h3 className="cardtitle">Lemon Dessert</h3>
              <p className="highlight">€8.00</p>
              <p className="specialtext">This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
              <p className="lead">Order a Delivery</p>
            </div>
          </div>
      </section>
      </>
    );
  }
  
  export default Specials;