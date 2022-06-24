import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import SideNavbar from '../SideNavbar/SideNavbar'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import train from '../../Images/train.jpg';

function TrainDetails() {
    const [userDetails, setUserDetails] = useState({});
    const [trainDetails, setTrainDetails] = useState({});

    const location = useLocation();

    useEffect(() => {
        setTrainDetails(location.state.uid);
        getUserDetails();
    }, []);


    const getUserDetails = () => {
        console.log(location.state.uid);
        axios.get(`${variable.API_URL}Users/${location.state.uid.userID}`)
            .then((response) => {
                const allUserDetails = response.data;
                setUserDetails(allUserDetails);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const cancelTrain = () => {
        axios.post(`${variable.API_URL}TrainBooking/${trainDetails.bookingRefNo}`)
            .then(response => response.json)
            .then(
                axios.get(`${variable.API_URL}TrainBooking/${trainDetails.bookingRefNo}`)
                    .then((response) => {
                        const allTrainBooking = response.data;
                        setTrainDetails(allTrainBooking);
                    })
            )
    }

    return (
        <div className='dashboard-page'>
            <Navbar />

            <div className='outermost-box'>
                <SideNavbar />

                <div className="random-div">
                    <div className="left">
                        <i className="fa fa-train" style={{ fontSize: "40px" }}></i>
                        <span> Train Booking Details </span>
                    </div>
                    <div className="right">
                        Booking ID : {trainDetails.bookingRefNo} <br />
                        Booking Date : {trainDetails.booking_Date}
                    </div>
                </div>

                <div className='bookings-btn'>
                    <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                    <a onClick={() => { cancelTrain() }}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Train</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                    <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
                </div>

                <div className="outer-details">
                    <div className="user-details">
                        <div className="flight Train">
                            <h4>Train Details</h4><br />


                            <div className="flight-details">

                                <div className="flight-core">
                                    <img src={train} alt="Train-Image" /> <br /> <br />
                                    &nbsp; <b>{trainDetails.trainName} </b>| {trainDetails.trainID}
                                </div>

                                <div className="flight-source">
                                    <b>{trainDetails.boarding}</b>&nbsp;
                                    {trainDetails.departureTime} <br />
                                    {trainDetails.booking_Date} <br />
                                </div>

                                <div className="flight-destination">
                                    <b>{trainDetails.destination}</b> &nbsp;
                                    {trainDetails.arrivalTime} <br />
                                    {trainDetails.bookingDate} <br />
                                </div>
                            </div>

                            <div className="baggage-details">
                                <b>Class</b> : {trainDetails.trainTicketClass} &nbsp;
                                <b>Quota</b> : {trainDetails.trainTicketQuota}  &nbsp;
                                <b>Travellers</b> : {trainDetails.traveller}  &nbsp;
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
                                        <td>Seat No</td>
                                        <td>Seat Type</td>
                                        <td>TicketNo</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{userDetails.userName}</td>
                                        <td>Adult</td>
                                        <td>{trainDetails.seatNo}</td>
                                        <td>{trainDetails.seatType}</td>
                                        <td>{trainDetails.bookingRefNo}</td>
                                        <td>{trainDetails.tripStatus}</td>
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
                                        <td>Base Fare : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> {trainDetails.trainTicketPrice} </td>
                                    </tr>
                                    <tr>
                                        <td> Taxes &amp; Fees : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 81 </td>
                                    </tr>
                                    <tr>
                                        <td> Insurance : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0</td>
                                    </tr>
                                    <tr>
                                        <td> EMT Service Fee : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 20</td>
                                    </tr>
                                    <tr>
                                        <td>Discount : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 101 </td>
                                    </tr>
                                    <tr>
                                        <td><b>Grand Total</b> : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> {trainDetails.trainTicketPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="cancellation-details">
                            <br />
                            <h5>Cancellation</h5>
                            <div className="cancellation-list">
                                <ul>
                                    <li>
                                        <a href="">What are the cancellation charges?</a><br />
                                    </li>
                                    <li>
                                        <a href="">I want to know my refund, if I cancel?</a><br />
                                    </li>
                                    <li>
                                        <a href="">My plans changed. How can I cancel my Train?</a><br />
                                    </li>
                                    <li>
                                        <a href="">I cancelled my Train with the Irctc. How will I get refund?</a><br />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default TrainDetails