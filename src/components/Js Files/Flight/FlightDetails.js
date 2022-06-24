import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import SideNavbar from '../SideNavbar/SideNavbar'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import './FlightDetails.css'
import Indigo from '../../Images/6E.gif';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

function FlightDetails(props) {

    const [userDetails, setUserDetails] = useState({});
    const [flightDetails, setFlightDetails] = useState({});
    const pdfExportComponent = useRef(null);

    var tempDate = new Date();

    const location = useLocation();

    useEffect(() => {
        setFlightDetails(location.state.flightobject);
        getUserDetails();
    }, []);


    const getUserDetails = () => {
        console.log(location.state.uid);
        axios.get(`${variable.API_URL}Users/${location.state.flightobject.userID}`)
            .then((response) => {
                const allUserDetails = response.data;
                setUserDetails(allUserDetails);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const cancelFlight = () => {
        if (flightDetails.tripStatus == "Cancelled") {
            alert("Booking is Already cancelled");
        }
        else {
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
            console.log(userDetails.userID);
            console.log(flightDetails.bookingRefNo);
            let transac = {
                "UserID": userDetails.userID,
                "BookingRefNo": flightDetails.bookingRefNo,
                "Amount": 1428,
                "TransactionStatus": "Success",
                "TransactionType": "FlightBooking",
                "TransactionDate": date.toString(),
                "Comment": "Flight Booking Cancelled"
            }
            axios.post(`${variable.API_URL}FlightBooking/${flightDetails.bookingRefNo}`)
                .then(response => response.json)
                .then(
                    axios.post(`${variable.API_URL}Transactions`, transac)
                )
                .then(
                    axios.get(`${variable.API_URL}FlightBooking/${flightDetails.bookingRefNo}`)
                        .then((response) => {
                            const allFlightBooking = response.data;
                            setFlightDetails(allFlightBooking);
                        })
                )
        }

    }

    const printTicket = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    }

    return (
        <div className='dashboard-page details-page'>
            <Navbar />

            <div className='outermost-box'>
                <SideNavbar uid={location.state.flightobject.userID} />

                <PDFExport ref={pdfExportComponent} paperSize="A2">

                    <div className="random-div">
                        <div className="left">
                            <i className="fa fa-plane" style={{ fontSize: "40px" }}></i>
                            <span> Flight Booking Details </span>
                        </div>
                        <div className="right">
                            Booking ID : {flightDetails.bookingRefNo} <br />
                            Booking Date : {flightDetails.bookingDate}
                        </div>
                    </div>

                    <div className='bookings-btn'>
                        <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                        <a onClick={() => { cancelFlight() }}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Flight</a>
                        <a onClick={() => { printTicket() }}> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                        <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                        <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
                    </div>


                    <div className="outer-details view-details">
                        <div className="user-details">
                            <div className="flight">
                                <h4>Flight Details</h4><br />


                                <div className="flight-details">

                                    <div className="flight-core">
                                        <img src={Indigo} alt="Indigo Logo" /> <br /> <br /> Indigo | {flightDetails.flightNo}
                                    </div>

                                    <div className="flight-source">
                                        <b>{flightDetails.boarding}</b>&nbsp;
                                        {flightDetails.departureTime} <br />
                                        {flightDetails.bookingDate} <br />
                                        {flightDetails.boarding} Airport
                                    </div>

                                    <div className="flight-destination">
                                        <b>{flightDetails.destination}</b> &nbsp;
                                        {flightDetails.arrivalTime} <br />
                                        {flightDetails.bookingDate} <br />
                                        {flightDetails.destination} Airport
                                    </div>
                                </div>

                                <div className="baggage-details">
                                    <b> Baggage </b> :
                                    Cabin : Contact To Airlines &nbsp;
                                    Check-In : {flightDetails.baggagelimit}
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
                                            <td>Web Check-In</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{userDetails.userName}</td>
                                            <td>Adult</td>
                                            <td>{flightDetails.boarding}-{flightDetails.destination}</td>
                                            <td>{flightDetails.bookingRefNo}</td>
                                            <td>{flightDetails.tripStatus}</td>
                                            <td><a href="https://www.goindigo.in/web-check-in.html"><button className="btn btn-outline-primary">Web Check-In</button></a></td>
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
                                            <td>Base Fare : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 1428</td>
                                        </tr>
                                        <tr>
                                            <td> Taxes &amp; Fees : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 71</td>
                                        </tr>
                                        <tr>
                                            <td> Insurance : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0</td>
                                        </tr>
                                        <tr>
                                            <td> Meals : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0 </td>
                                        </tr>
                                        <tr>
                                            <td> Baggage : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0</td>
                                        </tr>
                                        <tr>
                                            <td> Convenience Fee : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 0</td>
                                        </tr>
                                        <tr>
                                            <td>Discount : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 71 </td>
                                        </tr>
                                        <tr>
                                            <td><b>Grand Total</b> : <i className="fa fa-inr" style={{ fontSize: "15px" }}></i> 1428</td>
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
                                            <a href="">I want to know my refund, if I cancel</a><br />
                                        </li>
                                        <li>
                                            <a href="">My plans changed. How can I cancel my flight?</a><br />
                                        </li>
                                        <li>
                                            <a href="">I cancelled my flight with the airline. How will I get refund?</a><br />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </PDFExport>


            </div>
        </div >
    )
}

export default FlightDetails