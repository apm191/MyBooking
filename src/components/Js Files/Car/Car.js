import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import { Navigate, useNavigate } from 'react-router-dom';


function Car(props) {
    const [carBookings, setCarBookings] = useState([]);

    const [bookingid, setBookingid] = useState(0);

    const [book, setBook] = useState({});

    var tempDate = new Date();

    const navigate = useNavigate();

    useEffect(() => {
        getCarBookings();
    }, []);

    const getCarBookings = () => {
        axios.get(`${variable.API_URL}CarBooking?uid=${props.uid}`)
            .then((response) => {
                const allCarBooking = response.data;
                console.log(allCarBooking);
                setCarBookings(allCarBooking);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const ShowCarDetails = (cb) => {
        navigate('/CarDetails', { state: { carobject: cb } });
    }

    const cancelCar = () => {
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        let transac = {
            "UserID": props.uid,
            "BookingRefNO": book.bookingRefNo,
            "Amount": book.carRent,
            "TransactionStatus": "Success",
            "TransactionType": "Car Booking",
            "TransactionDate": date.toString(),
            "Comment": "Car Booking Cancelled"
        }
        if (bookingid == 0) {
            alert("Please Select your Booking");
        }
        else if (book.tripStatus == "Cancelled") {
            alert("Booking is Already cancelled");
        }
        else {
            axios.post(`${variable.API_URL}CarBooking/${bookingid}`)
                .then(response => response.json)
                .then(
                    axios.post(`${variable.API_URL}Transactions`, transac)
                )
                .then(axios.get(`${variable.API_URL}CarBooking?uid=${props.uid}`)
                    .then((response) => {
                        const allCarBooking = response.data;
                        console.log(allCarBooking);
                        setCarBookings(allCarBooking);
                    })
                    .catch(error => console.error(`Error : ${error}`)));

        }
    }


    if (carBookings.length > 0) {
        return (
            <div>
                <div className='bookings-btn'>
                    <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                    <a onClick={() => cancelCar()}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Car</a>
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
                            <td>Traveller </td>
                            <td>Trip Status</td>
                            <td>View &#38; Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {carBookings.map(cb => {
                            return (
                                <tr key={cb.bookingRefNo}>
                                    <td onClick={() => { setBookingid(cb.bookingRefNo); setBook(cb) }}><input className="form-check-input" type="radio" /></td>
                                    <td>{cb.bookingRefNo}</td>
                                    <td>{cb.boarding}</td>
                                    <td>{cb.destination}</td>
                                    <td>{cb.booking_Date}</td>
                                    <td>{cb.traveller}</td>
                                    <td>{cb.tripStatus}</td>
                                    <td><button className='btn btn-outline-primary' onClick={() => { ShowCarDetails(cb) }}>View and Manage</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
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
                            <td>Traveller </td>
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

export default Car