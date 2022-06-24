import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import { Navigate, useNavigate } from 'react-router-dom';

function Hotel(props) {

    const [hotelBookings, setHotelBookings] = useState([]);

    const [bookingid, setBookingid] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        getHotelBookings();
    }, []);

    const getHotelBookings = () => {
        axios.get(`${variable.API_URL}HotelBooking?uid=${props.uid}`)
            .then((response) => {
                const allHotelBooking = response.data;
                console.log(allHotelBooking);
                setHotelBookings(allHotelBooking);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const ShowHotelDetails = (htl) => {
        navigate('/HotelDetails', { state: { uid: htl } });
    }


    const cancelHotel = () => {
        if (bookingid == 0) {
            alert("Please Select your Booking");
        }
        else {
            axios.post(`${variable.API_URL}HotelBooking/${bookingid}`)
                .then(response => response.json)
                .then(
                    axios.get(`${variable.API_URL}HotelBooking?uid=${props.uid}`)
                        .then((response) => {
                            const allHotelBooking = response.data;
                            console.log(allHotelBooking);
                            setHotelBookings(allHotelBooking);
                        })
                        .catch(error => console.error(`Error : ${error}`))
                );
        }
    }

    if (hotelBookings.length > 0) {
        return (
            <div>
                <div className='bookings-btn'>
                    <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                    <a onClick={() => cancelHotel()}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Hotel</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
                    <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
                    <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
                </div>
                <table className='table'>
                    <thead className='table-light'>
                        <tr>
                            <td>#</td>
                            <td>Booking Ref Number</td>
                            <td>Hotel Name</td>
                            <td>Check-IN Date</td>
                            <td>Check-Out Date</td>
                            <td>Trip Status</td>
                            <td>View &#38; Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {hotelBookings.map(htl => {
                            return (
                                <tr key={htl.bookingRefNo}>
                                    <td onClick={() => { setBookingid(htl.bookingRefNo) }}><input className="form-check-input" type="radio" /></td>
                                    <td>{htl.bookingRefNo}</td>
                                    <td>{htl.hotelName}</td>
                                    <td>{htl.checkIn_Date}</td>
                                    <td>{htl.checkOut_Date}</td>
                                    <td>{htl.tripStatus}</td>
                                    <td><button className='btn btn-outline-primary' onClick={() => { ShowHotelDetails(htl) }}>View and Manage</button></td>
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
                            <td>Hotel Name</td>
                            <td>Check-IN Date</td>
                            <td>Check-Out Date</td>
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

export default Hotel