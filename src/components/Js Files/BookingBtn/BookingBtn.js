// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { variable } from '../../Variables';


// function BookingBtn(props) {

//     const cancelBooking = () => {
//         if (bookingid == 0) {
//             alert("Please Select your Booking");
//         }
//         else {
//             axios.post(`${variable.API_URL}FlightBooking/${bookingid}`)
//                 .then(response => response.json).then(window.location.reload());
//         }
//     }

//     return (
//         <div>
//             <a> <i className="fa fa-envelope" style={{ fontSize: "18px" }}></i>E-Mail</a>
//             <a onClick={() => cancelBooking()}> <i className="fa fa-times" style={{ fontSize: "18px" }}></i>Cancel {props.module}</a>
//             <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Ticket</a>
//             <a> <i className="fa fa-print" style={{ fontSize: "18px" }}></i>Print Invoice </a>
//             <a> <i className="fa fa-mobile" style={{ fontSize: "18px" }}></i>SMS Ticket</a>
//         </div>
//     )
// }

// export default BookingBtn