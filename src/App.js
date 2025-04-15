import { useReducer } from 'react';
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
import ConfirmedBooking from "./ConfirmedBooking";
import { initializeTimes, updateTimes } from './AvailableTimes';

function App() {

  //updateTimes: reducer function (handles updates) 
  //[]: placeholder initial state
  //initializeTimes: function to generate initial state, called once on first render.
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/booking" element={<Booking availableTimes={availableTimes} dispatch={dispatch} />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/bookingconfirmed" element={<ConfirmedBooking />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;