import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import SideNavbar from '../SideNavbar/SideNavbar';
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import busimg from '../../Images/bus.jpg'
// import './BusDetails.css';


function BusDetails() {
    const [userDetails, setUserDetails] = useState({});
    const [busDetails, setBusDetails] = useState({});

    var tempDate = new Date();

    const location = useLocation();

    useEffect(() => {
        setBusDetails(location.state.busobject);
        getUserDetails();
        console.log(userDetails);
    }, []);


    const getUserDetails = () => {
        console.log(location.state.busobject);
        axios.get(`${variable.API_URL}Users/${location.state.busobject.userID}`)
            .then((response) => {
                const allUserDetails = response.data;
                setUserDetails(allUserDetails);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const cancelbus = () => {
        if (busDetails.tripStatus == "Cancelled") {
            alert("Booking is Already cancelled");
        }
        else {
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
            let transac = {
                "UserID": userDetails.userID,
                "BookingRefNo": busDetails.bookingRefNo,
                "Amount": busDetails.busTicketPrice,
                "TransactionStatus": "Success",
                "TransactionType": "Bus Booking",
                "TransactionDate": date.toString(),
                "Comment": "Bus Booking Cancelled"
            }
            axios.post(`${variable.API_URL}BusBooking/${busDetails.bookingRefNo}`)
                .then(response => response.json)
                .then(
                    axios.post(`${variable.API_URL}Transactions`, transac)
                )
                .then(
                    axios.get(`${variable.API_URL}BusBooking/${busDetails.bookingRefNo}`)
                        .then((response) => {
                            const allBusBooking = response.data;
                            setBusDetails(allBusBooking);
                        })
                )
        }

    }

    return (
        <div className='dashboard-page'>
            <Navbar />

            <div className='outermost-box'>
                <SideNavbar uid={location.state.busobject.userID} />

                <div className="random-div">
                    <div className="left">
                        <i className="fa fa-bus" style={{ fontSize: "40px" }}></i>
                        <span> Bus Booking Details </span>
                    </div>
                    <div className="right">
                        Booking ID : {busDetails.bookingRefNo} <br />
                        Booking Date : {busDetails.booking_Date}
                    </div>
                </div>

                <div className='bookings-btn'>
                    <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                    <a onClick={() => { cancelbus() }}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Bus</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                    <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
                </div>

                <div className="outer-details">
                    <div className="user-details">
                        <div className="flight">
                            <h4>Bus Details</h4><br />

                            <div className="flight-details">

                                <div className="flight-core">
                                    <img src={busimg} alt="bus-image" className='bus-img' /> <br /><br />
                                    <b>{busDetails.busOperatorName}</b> | {busDetails.busID}
                                </div>

                                <div className="flight-source">
                                    <b>{busDetails.boarding}</b>&nbsp;
                                    {busDetails.departureTime} <br />
                                    {busDetails.travel_Date} <br />
                                    {busDetails.boardingPoint}
                                </div>

                                <div className="flight-destination">
                                    <b>{busDetails.destination}</b> &nbsp;
                                    {busDetails.arrivalTime} <br />
                                    {busDetails.travel_Date} <br />
                                    {busDetails.droppingPoint}
                                </div>
                            </div>

                            <div className="baggage-details">
                                <b>Seat No</b> : {busDetails.seatNo} &nbsp; &nbsp;
                                <b>Bus Type</b> : {busDetails.busType}
                            </div>
                        </div>

                        <br />


                        <div className="passenger-details">
                            <h4> Passenger Details</h4>
                            <br />
                            <table className='table'>
                                <thead className='table'>
                                    <tr>
                                        <td>Name</td>
                                        <td>Pax Type</td>
                                        <td>Sector</td>
                                        <td>TicketNo</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{userDetails.userName}</td>
                                        <td>Adult</td>
                                        <td>{busDetails.boarding}-{busDetails.destination}</td>
                                        <td>{busDetails.bookingRefNo}</td>
                                        <td>{busDetails.tripStatus}</td>
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
                                        <td>Adultx : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> {busDetails.busTicketPrice}</td>
                                    </tr>
                                    <tr>
                                        <td> Insurance : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0</td>
                                    </tr>
                                    <tr>
                                        <td>Discount : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0 </td>
                                    </tr>
                                    <tr>
                                        <td><b>Grand Total</b> : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> {busDetails.busTicketPrice}</td>
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

export default BusDetails