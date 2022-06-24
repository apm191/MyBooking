import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import { useNavigate, useLocation } from 'react-router-dom'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

function Flight(props) {

    const [flightBookings, setFlightBookings] = useState([]);

    const [bookingid, setBookingid] = useState(0);

    const [book, setBook] = useState({});
    var tempDate = new Date();

    const navigate = useNavigate();

    useEffect(() => {
        getFlightBookings();
    }, []);


    const getFlightBookings = () => {
        axios.get(`${variable.API_URL}FlightBooking`)
            .then((response) => {
                const allFlightBooking = response.data;
                setFlightBookings(allFlightBooking);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const ShowFlightDetails = (fly) => {
        navigate('/FlightDetails', { state: { flightobject: fly } });
    }

    const cancelFlight = () => {
        if (bookingid == 0) {
            alert("Please Select your Booking");
        }
        else if (book.tripStatus == "Cancelled") {
            alert("Booking is Already cancelled");
        }
        else {
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
            let transac = {
                "UserID": props.uid,
                "BookingRefNo": book.bookingRefNo,
                "Amount": 1428,
                "TransactionStatus": "Success",
                "TransactionType": "FlightBooking",
                "TransactionDate": date.toString(),
                "Comment": "Flight Booking Cancelled"
            }
            axios.post(`${variable.API_URL}FlightBooking/${bookingid}`)
                .then(response => response.json)
                .then(
                    axios.post(`${variable.API_URL}Transactions`, transac)
                        .then(response => response.json())
                )
                .then(
                    axios.get(`${variable.API_URL}FlightBooking`)
                        .then((response) => {
                            const allFlightBooking = response.data;
                            setFlightBookings(allFlightBooking);
                        })
                        .catch(error => console.error(`Error : ${error}`))
                )
        }
    }

    const sendEmail = () => {
        if (bookingid == 0) {
            alert("Please Select your Booking");
        }
        else {
            axios.put(`${variable.API_URL}FlightBooking`, book)
                .then(response => response.json)
                .then(alert("Email Sent to your Registered Mail ID"));
        }
    }

    return (
        <div>
            <div className='bookings-btn'>
                <a onClick={() => { sendEmail() }}> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                <a onClick={() => cancelFlight()}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Flight</a>
                <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
            </div>
            <table className='table'>
                <thead className='table-light'>
                    <tr>
                        <td>#</td>
                        <td>Booking Ref Number</td>
                        <td>Departure</td>
                        <td>Arrival</td>
                        <td>Journey Date</td>
                        <td>Booking Date</td>
                        <td>Trip Status</td>
                        <td>View &#38; Manage</td>
                    </tr>
                </thead>
                <tbody>
                    {flightBookings.map(fly => {
                        if (fly.userID === props.uid) {
                            return (
                                <tr key={fly.bookingRefNo}>
                                    <td onClick={() => { setBookingid(fly.bookingRefNo); setBook(fly); }}><input className="form-check-input" type="radio" /></td>
                                    <td>{fly.bookingRefNo}</td>
                                    <td>{fly.boarding}</td>
                                    <td>{fly.destination}</td>
                                    <td>{fly.journeyDate}</td>
                                    <td>{fly.bookingDate}</td>
                                    <td>{fly.tripStatus}</td>
                                    <td><button className='btn btn-outline-primary' onClick={() => { ShowFlightDetails(fly) }}>View and Manage</button></td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Flight