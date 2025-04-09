import Hero from "./Hero";
import Specials from "./Specials";
import Testimonials from "./Testimonials";
import RestaurantInfo from "./RestaurantInfo";

function Home() {
  return (
    <main class="homemain">
      <Hero />
      <Specials />
      <Testimonials />
      <RestaurantInfo />
    </main>
  );
}

export default Home;