import profilepic1 from './assets/images/profile1.png';
import profilepic2 from './assets/images/profile2.png';
import profilepic3 from './assets/images/profile3.png';

import { Link } from 'react-router-dom';

function Testimonials() {
    return (
        <section className="testimonials-row">
            <div className="testimonials-header">
                <h1>Testimonials</h1>
            </div>

            <div className="testimonials">
                <div className="testimonial">
                    <h3 className="tname">Mary O'Malley</h3>
                    <img className="testimonialimage" src={profilepic3} />
                    <p className="tstars">⭐⭐⭐⭐⭐</p>
                    <p className="treview">Little Lemon is my go-to spot for fresh, flavorful Mediterranean food that always feels like home.</p>
                </div>
                <div className="testimonial">
                    <h3 className="tname">Josiah Jones</h3>
                    <img className="testimonialimage" src={profilepic1} />
                    <p className="tstars">⭐⭐⭐⭐⭐</p>
                    <p className="treview">The staff are so warm and welcoming — it’s like dining with family every time I visit.</p>
                </div>
                <div className="testimonial">
                    <h3 className="tname">Stefano Stellato</h3>
                    <img className="testimonialimage" src={profilepic2} />
                    <p className="tstars">⭐⭐⭐⭐⭐</p>
                    <p className="treview">Every dish is bursting with authentic flavor; the lemon herb chicken is an absolute must!</p>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;