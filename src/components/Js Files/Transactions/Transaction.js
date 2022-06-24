import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { variable } from '../../Variables';
import { useNavigate, useLocation } from 'react-router-dom'
import SideNavbar from '../SideNavbar/SideNavbar.js';
import Navbar from '../Navbar/Navbar.js'

function Transaction() {
    const [transactions, setTransactions] = useState([]);

    const location = useLocation();

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = () => {
        axios.get(`${variable.API_URL}Transactions/${location.state.uid}`)
            .then((response) => {
                const allTransactions = response.data;
                setTransactions(allTransactions);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    return (
        <div className='dashboard-page'>
            <Navbar />
            <div className="outermost-box">
                <SideNavbar uid={location.state.uid} />

                <h4>Transaction History</h4>
                <div className="dashboard-table">
                    <table className='table'>
                        <thead className='table-light'>
                            <tr>
                                <td>#</td>
                                <td>Transaction ID</td>
                                <td>Booking Ref Number</td>
                                <td>Amount</td>
                                <td>Transaction Status</td>
                                <td>Transaction Type</td>
                                <td>Transaction Date</td>
                                <td>Comment</td>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(trs => {
                                return (
                                    <tr key={trs.transactionID}>
                                        <td><input className="form-check-input" type="radio" /></td>
                                        <td>{trs.transactionID}</td>
                                        <td>{trs.bookingRefNo}</td>
                                        <td>{trs.amount}</td>
                                        <td>{trs.transactionStatus}</td>
                                        <td>{trs.transactionType}</td>
                                        <td>{trs.transactionDate}</td>
                                        <td>{trs.comment}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Transaction