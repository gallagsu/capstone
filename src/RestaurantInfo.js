import aboutimage2 from './assets/images/Mario and Adrian A.jpg';
import aboutimage1 from './assets/images/restaurant.jpg';

function RestaurantInfo() {
    return (
        <section className="info-row">
            <div className="info1">
                <h1>Little Lemon Restaurant</h1>
                <p>We are a family owned Mediterranean restaurant, focussed on traditional recipes served with a modern twist. This is a nice description of the recipes restaurant and the types of recipes food it serves. This is a description of the recipes restaurant and the types of food it serves. This is a description of the recipes restaurant and the types of food it serves. This is a description of the recipes restaurant and the types of food it serves. Thisrecipes is a description of the restaurant and the types of food it serves.</p>
            </div>

            <div className="info2">
                <img className="infoimage1" src={aboutimage1} />
                <img className="infoimage2" src={aboutimage2} />
            </div>
        </section>
    );
}

export default RestaurantInfo;