import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import { useNavigate, useLocation } from 'react-router-dom'


function Bus(props) {
    const [busBookings, setBusBookings] = useState([]);

    const [bookingid, setBookingid] = useState(0);

    const [book, setBook] = useState({});

    var tempDate = new Date();

    const navigate = useNavigate();

    useEffect(() => {
        getBusBookings();
    }, []);

    const getBusBookings = () => {
        axios.get(`${variable.API_URL}BusBooking?uid=${props.uid}`)
            .then((response) => {
                const allBusBooking = response.data;
                console.log(allBusBooking);
                setBusBookings(allBusBooking);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const ShowBusDetails = (bs) => {
        navigate('/BusDetails', { state: { busobject: bs } });
    }

    const cancelBus = () => {
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        let transac = {
            "UserID": props.uid,
            "BookingRefNO": book.bookingRefNo,
            "Amount": book.busTicketPrice,
            "TransactionStatus": "Success",
            "TransactionType": "Bus Booking",
            "TransactionDate": date.toString(),
            "Comment": "Bus Booking Cancelled"
        }
        if (bookingid == 0) {
            alert("Please Select your Booking");
        }
        else {
            axios.post(`${variable.API_URL}BusBooking/${bookingid}`)
                .then(response => response.json)
                .then(axios.get(`${variable.API_URL}BusBooking?uid=${props.uid}`)
                    .then((response) => {
                        const allBusBooking = response.data;
                        console.log(allBusBooking);
                        setBusBookings(allBusBooking);
                    })
                    .catch(error => console.error(`Error : ${error}`)))
                .then(
                    axios.post(`${variable.API_URL}Transactions`, transac)
                )
        }
    }

    if (busBookings.length > 0) {
        return (
            <div>
                <div className='bookings-btn'>
                    <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                    <a onClick={() => cancelBus()}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Bus</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                    <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
                </div>
                <table className='table'>
                    <thead className='table-light'>
                        <tr>
                            <td>#</td>
                            <td>Booking Ref Number</td>
                            <td>Boarding</td>
                            <td>Destination</td>
                            <td>Booking Date</td>
                            <td>Travel Date</td>
                            <td>Trip Status</td>
                            <td>View &#38; Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {busBookings.map(bs => {
                            return (
                                <tr key={bs.bookingRefNo}>
                                    <td onClick={() => { setBookingid(bs.bookingRefNo); setBook(bs) }}><input className="form-check-input" type="radio" /></td>
                                    <td>{bs.bookingRefNo}</td>
                                    <td>{bs.boarding}</td>
                                    <td>{bs.destination}</td>
                                    <td>{bs.booking_Date}</td>
                                    <td>{bs.travel_Date}</td>
                                    <td>{bs.tripStatus}</td>
                                    <td><button className='btn btn-outline-primary' onClick={() => { ShowBusDetails(bs) }}>View and Manage</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div>
                <table className='table'>
                    <thead className='table-light'>
                        <tr>
                            <td>#</td>
                            <td>Booking Ref Number</td>
                            <td>Boarding</td>
                            <td>Destination</td>
                            <td>Booking Date</td>
                            <td>Travel Date</td>
                            <td>Trip Status</td>
                            <td>View &#38; Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <h6>No Booking History</h6>
            </div>
        )
    }
}

export default Bus