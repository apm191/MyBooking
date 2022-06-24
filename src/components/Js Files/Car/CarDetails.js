import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import SideNavbar from '../SideNavbar/SideNavbar';
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Carimg from '../../Images/carimg.png';
import './CarDetails.css';

function CarDetails() {
    const [userDetails, setUserDetails] = useState({});
    const [carDetails, setCarDetails] = useState({});

    var tempDate = new Date();

    const location = useLocation();

    useEffect(() => {
        setCarDetails(location.state.carobject);
        getUserDetails();
        console.log(userDetails);
    }, []);


    const getUserDetails = () => {
        axios.get(`${variable.API_URL}Users/${location.state.carobject.userID}`)
            .then((response) => {
                const allUserDetails = response.data;
                setUserDetails(allUserDetails);
            })
            .catch(error => console.error(`Error : ${error}`));
    }


    const cancelCar = () => {
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        let transac = {
            "UserID": userDetails.userID,
            "BookingRefNO": carDetails.bookingRefNo,
            "Amount": carDetails.carRent,
            "TransactionStatus": "Success",
            "TransactionType": "Car Booking",
            "TransactionDate": date.toString(),
            "Comment": "Car Booking Cancelled"
        }
        if (carDetails.tripStatus == "Cancelled") {
            alert("Booking is Already cancelled");
        }
        axios.post(`${variable.API_URL}CarBooking/${carDetails.bookingRefNo}`)
            .then(response => response.json)
            .then(
                axios.post(`${variable.API_URL}Transactions`, transac)
            )
            .then(
                axios.get(`${variable.API_URL}CarBooking/${carDetails.bookingRefNo}`)
                    .then((response) => {
                        const allCarBooking = response.data;
                        setCarDetails(allCarBooking);
                    })
            )
    }

    return (
        <div className='dashboard-page'>
            <Navbar />

            <div className='outermost-box'>
                <SideNavbar uid={location.state.carobject.userID} />

                <div className="random-div random-Car">
                    <div className="left">
                        <i className="fa fa-car" style={{ fontSize: "40px" }}></i>
                        <span> Car Booking Details </span>
                    </div>
                    <div className="right">
                        Booking ID : {carDetails.bookingRefNo} <br />
                        Booking Date : {carDetails.booking_Date}
                    </div>
                </div>

                <div className='bookings-btn'>
                    <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                    <a onClick={() => { cancelCar() }}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Car</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                    <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
                </div>

                <div className="outer-details">
                    <div className="user-details">
                        <div className="flight">
                            <h4>Car Details</h4><br />

                            <div className="flight-details">

                                <div className="Car-core">
                                    <img src={Carimg} alt="Car Image" /> <br />
                                    {carDetails.carOperatorName} | {carDetails.carID}
                                </div>

                                <div className="flight-source car-location">
                                    {carDetails.pickupLocation}&nbsp; <br />
                                    {carDetails.pickupTime}

                                </div>
                                <div className="flight-destination">
                                    {carDetails.dropOffLocation} &nbsp; <br /> <br />
                                    <b> Travellers </b>: {carDetails.traveller}
                                </div>
                            </div>

                            <div className="baggage-details">
                                <b>Car Type</b> : {carDetails.carType}
                            </div>
                        </div>

                        <br />


                        <div className="passenger-details">
                            <h4> Passenger Details</h4>
                            <br />
                            <table className='table'>
                                <thead className='table'>
                                    <tr>
                                        <td>Booking Ref No.</td>
                                        <td>Name</td>
                                        <td>Pax Type</td>
                                        <td>Email</td>
                                        <td>Contact No.</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{carDetails.bookingRefNo}</td>
                                        <td>{userDetails.userName}</td>
                                        <td>Adult</td>
                                        <td>{userDetails.userEmailID}</td>
                                        <td>{userDetails.userPhoneNo}</td>
                                        <td>{carDetails.tripStatus}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="price-details">
                        <h4>Price Summary</h4>
                        <div className="breakout">
                            <br />
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Passengers x Price(s) : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> {carDetails.carRent}</td>
                                    </tr>
                                    <tr>
                                        <td> Taxes And Fares : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 146 </td>
                                    </tr>
                                    <tr>
                                        <td>Discount : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 146 </td>
                                    </tr>
                                    <tr>
                                        <td><b>Grand Total</b> : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> {carDetails.carRent}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default CarDetails