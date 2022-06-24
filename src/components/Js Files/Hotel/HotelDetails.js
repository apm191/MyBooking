import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import SideNavbar from '../SideNavbar/SideNavbar';
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import './HotelDetails.css';
import hotelimg from '../../Images/hotel.jpg';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

function HotelDetails() {
    const [userDetails, setUserDetails] = useState({});
    const [hotelDetails, setHotelDetails] = useState({});
    const pdfExportComponent = useRef(null);

    const location = useLocation();

    useEffect(() => {
        setHotelDetails(location.state.uid);
        getUserDetails();
        console.log(userDetails);
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

    const cancelHotel = () => {
        axios.post(`${variable.API_URL}HotelBooking/${hotelDetails.bookingRefNo}`)
            .then(response => response.json)
            .then(
                axios.get(`${variable.API_URL}HotelBooking/${hotelDetails.bookingRefNo}`)
                    .then((response) => {
                        const allHotelBooking = response.data;
                        setHotelDetails(allHotelBooking);
                    })
            )
    }

    const printTicket = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    }

    return (
        <div className='dashboard-page'>
            <Navbar />

            <div className='outermost-box'>
                <SideNavbar />
                <PDFExport ref={pdfExportComponent} paperSize="A2">
                    <div className="random-div random-hotel">
                        <div className="left">
                            <i className="fa fa-hotel" style={{ fontSize: "40px" }}></i>
                            <span> Hotel Booking Details </span>
                        </div>
                        <div className="right">
                            Booking ID : {hotelDetails.bookingRefNo} <br />
                            Booking Date : {hotelDetails.checkIn_Date}
                        </div>
                    </div>

                    <div className='bookings-btn'>
                        <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                        <a onClick={() => { cancelHotel() }}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Hotel</a>
                        <a onClick={() => { printTicket() }}> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                        <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                        <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
                    </div>


                    <div className="outer-details">
                        <div className="user-details">
                            <div className="flight">
                                <h4>Hotel Details</h4><br />

                                <div className="flight-details">

                                    <div className="hotel-core">
                                        <img src={hotelimg} alt="Hotel Image" /> <br />
                                        {hotelDetails.hotelName} | {hotelDetails.hotelID}
                                    </div>

                                    <div className="flight-source">
                                        <b>{hotelDetails.hotelName}</b>&nbsp;<br />
                                        {hotelDetails.hotelAddress} <br />
                                    </div>
                                </div>

                                <div className="baggage-details">
                                    <b>Hotel Room Type</b> : {hotelDetails.hotelRoomType}
                                </div>
                            </div>

                            {/* <div className="cancellation">
                            <ul>
                                <li>Before: {hotelDetails.checkIn_Date} Rs 0 (Free cancellation)</li>
                                <li>After: {hotelDetails.checkOut_Date} 100% Charge (Non Refundable) </li>
                            </ul>
                        </div> */}

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
                                            <td>Check-In Date</td>
                                            <td>Check-Out Date</td>
                                            <td>Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{hotelDetails.bookingRefNo}</td>
                                            <td>{userDetails.userName}</td>
                                            <td>Adult</td>
                                            <td>{hotelDetails.checkIn_Date}</td>
                                            <td>{hotelDetails.checkOut_Date}</td>
                                            <td>{hotelDetails.tripStatus}</td>
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
                                            <td>Room X Night(s) : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 1214</td>
                                        </tr>
                                        <tr>
                                            <td> Taxes And Fares : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 146 </td>
                                        </tr>
                                        <tr>
                                            <td>Discount : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0 </td>
                                        </tr>
                                        <tr>
                                            <td><b>Grand Total</b> : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 1360</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </PDFExport>
            </div>
        </div >
    )
}

export default HotelDetails