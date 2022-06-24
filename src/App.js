import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Js Files/Login/Login';
import Dashboard from './components/Js Files/Dashboard/Dashboard';
import FlightDetails from './components/Js Files/Flight/FlightDetails';
import BusDetails from './components/Js Files/Bus/BusDetails';
import HotelDetails from './components/Js Files/Hotel/HotelDetails';
import CarDetails from './components/Js Files/Car/CarDetails';
import TrainDetails from './components/Js Files/Train/TrainDetails';
import Transaction from './components/Js Files/Transactions/Transaction';
import Profile from './components/Js Files/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}> </Route>
          <Route path='/Dashboard' element={<Dashboard />}> </Route>
          <Route path='/FlightDetails' element={<FlightDetails />}></Route>
          <Route path='/BusDetails' element={<BusDetails />}></Route>
          <Route path='/HotelDetails' element={<HotelDetails />}></Route>
          <Route path='/CarDetails' element={<CarDetails />}></Route>
          <Route path='/TrainDetails' element={<TrainDetails />}></Route>
          <Route path='/Transaction' element={<Transaction />}></Route>
          <Route path='/Profile' element={<Profile />}></Route>

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
