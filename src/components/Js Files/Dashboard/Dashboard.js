import React, { useState, useEffect } from 'react'
import SideNavbar from '../SideNavbar/SideNavbar'
import { useNavigate, useLocation } from 'react-router-dom'
import './Dashboard.css'
import Navbar from '../Navbar/Navbar';
import Flight from '../Flight/Flight';
import Hotel from '../Hotel/Hotel';
import Bus from '../Bus/Bus';
import Car from '../Car/Car';
import Train from '../Train/Train';
import Profile from '../Profile/Profile';

function Dashboard() {

    const navigate = useNavigate();
    const location = useLocation();
    const [userid, setUserid] = useState(0);
    const [module, setModule] = useState("");

    const showModule = (mod) => {
        setModule(mod);
    }

    useEffect(() => {
        setUserid(location.state.uid);
    })

    return (
        <div className='dashboard-page'>
            <Navbar uid={location.state.uid} />

            <div className='outermost-box'>
                <SideNavbar uid={location.state.uid} />

                <div className='services-btn'>
                    <a className='Flight-btn' onClick={() => { showModule("Flight") }}> <i className="fa fa-plane" style={{ fontSize: "20px" }}></i>Flight Booking</a>
                    <a className='Hotel-btn' onClick={() => { showModule("Hotel") }}>  <i className="fa fa-hotel" style={{ fontSize: "20px" }}></i>Hotel Booking</a>
                    <a className='Bus-btn' onClick={() => { showModule("Bus") }}> <i className="fa fa-bus" style={{ fontSize: "20px" }}></i>Bus Booking</a>
                    <a className='Car-btn' onClick={() => { showModule("Car") }}> <i className="fa fa-car" style={{ fontSize: "20px" }}></i>Car Booking</a>
                    <a className='Train-btn' onClick={() => { showModule("Train") }}> <i className="fa fa-train" style={{ fontSize: "20px" }}></i>Train Booking</a>
                </div>
                <hr className='horizontal-line' />

                <div className='dashboard-table'>
                    {module === "" && <h4>Please select Transport</h4>}
                    {module === "Flight" && <Flight uid={userid} />}
                    {module === "Hotel" && <Hotel uid={userid} />}
                    {module === "Bus" && <Bus uid={userid} />}
                    {module === "Car" && <Car uid={userid} />}
                    {module === "Train" && <Train uid={userid} />}
                </div>

            </div>
        </div>
    )
}

export default Dashboard;