import profilepic from './assets/images/greek salad.jpg';

function Testimonials() {
    return (
        <section className="testimonials-row">
            <div className="testimonials-header">
                <h1>Testimonials</h1>
            </div>

            <div className="testimonials">
                <div className="testimonial">
                    <h3 className="tname">Name</h3>
                    <img className="testimonialimage" src={profilepic} />
                    <p className="tstars">Stars</p>
                    <p className="treview">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                </div>
                <div className="testimonial">
                    <h3 className="tname">Name</h3>
                    <img className="testimonialimage" src={profilepic} />
                    <p className="tstars">Stars</p>
                    <p className="treview">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                </div>
                <div className="testimonial">
                    <h3 className="tname">Name</h3>
                    <img className="testimonialimage" src={profilepic} />
                    <p className="tstars">Stars</p>
                    <p className="treview">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;