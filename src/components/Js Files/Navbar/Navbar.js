import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Logo from '../../Images/EMTLogo.png';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { variable } from '../../Variables';

function Navbar(props) {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    function upload() {
        if (document.getElementById("mySidenav").style.display == "block") {
            document.getElementById("mySidenav").style.display = "none";
        }
        else
            document.getElementById("mySidenav").style.display = "block";
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = () => {
        axios.get(`${variable.API_URL}Users/${props.uid}`)
            .then((response) => {
                setUserDetails(response.data);
            });
    }

    return (
        <div>
            <nav className="navbar navbar-light navbar-expand-lg">
                <div className="container-fluid">
                    <div onClick={() => { upload() }}>
                        <span className="navbar-toggler-icon"> </span>
                    </div>
                    <a className="navbar-brand">
                        <img src={Logo} alt="EMT Logo" />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://www.easemytrip.com/"> <i className="fa fa-plane" style={{ fontSize: "24px" }}></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://www.easemytrip.com/hotels"><i className="fa fa-hotel" style={{ fontSize: "24px" }}></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://www.easemytrip.com/bus"><i className="fa fa-bus" style={{ fontSize: "24px" }}></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://www.easemytrip.com/cabs"><i className="fa fa-car" style={{ fontSize: "24px" }}></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://www.easemytrip.com/railways"><i className="fa fa-train" style={{ fontSize: "24px" }}></i></a>
                            </li>
                        </ul>
                        <button type="button" className='btn btn-outline-primary logout-btn' onClick={() => { navigate('/') }}>Log Out</button>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar