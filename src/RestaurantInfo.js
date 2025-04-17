import aboutimage1 from './assets/images/Mario and Adrian A.jpg';
import aboutimage2 from './assets/images/restaurant.jpg';

function RestaurantInfo() {
    return (
        <section className="info-row">
            <div className="info1">
                <h1>Little Lemon Restaurant</h1>
                <p>Little Lemon is a neighborhood gem that brings the vibrant spirit of the Mediterranean to Chicago with simple, honest food and heartfelt hospitality. With its cozy dining room, sun-washed walls, and the scent of fresh herbs in the air, the restaurant offers a relaxed yet intimate setting perfect for casual meals or special occasions. Whether you're stopping in for a quick bite or settling in for a long evening with friends, Little Lemon is all about making guests feel welcome and well-fed.</p>
            </div>

            <div className="info2">
                <img className="infoimage1" src={aboutimage1} alt="Chefs at work" />
                <img className="infoimage2" src={aboutimage2} alt="Restaurant room" />
            </div>
        </section>
    );
}

export default RestaurantInfo;