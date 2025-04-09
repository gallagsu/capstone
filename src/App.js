import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Menu from "./Menu";
import Booking from "./Booking";
import Order from "./Order";
import Login from "./Login";

function App() {
  return (
    <div className="container">
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/menu" element={<Menu/>}></Route>
        <Route path="/booking" element={<Booking/>}></Route>
        <Route path="/order" element={<Order/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;