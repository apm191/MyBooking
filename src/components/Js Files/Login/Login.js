import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Login.css';
import { variable } from "../../Variables";
import Dashboard from "../Dashboard/Dashboard";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {

    const [mobile, setMobile] = useState();
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const [database, setDatabase] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    // User Login info

    const getUsers = () => {
        axios.get(`${variable.API_URL}Users`)
            .then((response) => {
                const allUsers = response.data;
                setDatabase(allUsers);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    const handleSubmit = () => {

        const userData = database.find((user) =>
            user.userPhoneNo == mobile
        );

        if (userData) {
            if (userData.password == pass) {
                navigate('/Dashboard', { state: { uid: userData.userID } });
            }
        }
    };


    return (
        <div className="login">
            <div className="login-form" onSubmit={handleSubmit}>
                <div className="form">
                    <div className="title">Sign In</div>
                    <form>
                        <div className="input-container">

                            <label> Mobile No. </label>
                            <input type="text" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />


                        </div>
                        <div className="input-container">

                            <label>Password </label>
                            <input type="password" name="pass" id="pass" value={pass} onChange={(e) => setPass(e.target.value)} required />


                        </div>
                        <div className="button-container">
                            <button className='btn btn-success'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;