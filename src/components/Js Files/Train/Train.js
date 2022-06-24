import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import { useNavigate, useLocation } from 'react-router-dom'
import BookingBtn from '../BookingBtn/BookingBtn';


function Train(props) {
    const [trainBookings, setTrainBookings] = useState([]);

    const [bookingid, setBookingid] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        getTrainBookings();
    }, []);

    const getTrainBookings = () => {
        axios.get(`${variable.API_URL}TrainBooking?uid=${props.uid}`)
            .then((response) => {
                const allTrainBooking = response.data;
                console.log(allTrainBooking);
                setTrainBookings(allTrainBooking);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const ShowTrainDetails = (tb) => {
        navigate('/TrainDetails', { state: { uid: tb } });
    }

    const cancelTrain = () => {
        if (bookingid == 0) {
            alert("Please Select your Booking");
        }
        else {
            axios.post(`${variable.API_URL}TrainBooking/${bookingid}`)
                .then(response => response.json)
                .then(axios.get(`${variable.API_URL}TrainBooking?uid=${props.uid}`)
                    .then((response) => {
                        const allTrainBooking = response.data;
                        console.log(allTrainBooking);
                        setTrainBookings(allTrainBooking);
                    })
                    .catch(error => console.error(`Error : ${error}`)));
        }
    }

    if (trainBookings.length > 0) {
        return (
            <div>
                <div className='bookings-btn'>
                    <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
                    <a onClick={() => cancelTrain()}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel Train</a>
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
                            <td>Train Name</td>
                            <td>Journey Date</td>
                            <td>Booking Date</td>
                            <td>Travellers </td>
                            <td>Trip Status</td>
                            <td>View &#38; Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trainBookings.map(tb => {
                            return (
                                <tr key={tb.bookingRefNo}>
                                    <td onClick={() => { setBookingid(tb.bookingRefNo) }}><input className="form-check-input" type="radio" /></td>
                                    <td>{tb.bookingRefNo}</td>
                                    <td>{tb.boarding}</td>
                                    <td>{tb.destination}</td>
                                    <td>{tb.trainName}</td>
                                    <td>{tb.journey_Date}</td>
                                    <td>{tb.booking_Date}</td>
                                    <td>{tb.traveller}</td>
                                    <td>{tb.tripStatus}</td>
                                    <td><button className='btn btn-outline-primary' onClick={() => { ShowTrainDetails(tb) }}>View and Manage</button></td>
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
                            <td>Train Name</td>
                            <td>Journey Date</td>
                            <td>Booking Date</td>
                            <td>Travellers </td>
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

export default Train