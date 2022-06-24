import React, { useState, useEffect } from 'react'
// import { useRef } from 'react';
import './Profile.css';
import SideNavbar from '../SideNavbar/SideNavbar'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import DefaultProfileImage from '../../Images/default-profile.png'
import { variable } from '../../Variables';
import axios from 'axios';

function Profile() {
    const [userDetails, setUserDetails] = useState({});

    const [user_Name, setUser_Name] = useState("");
    const [user_Gender, setUser_Gender] = useState("");
    const [user_MartialStatus, setUser_MartialStatus] = useState("");
    const [user_Birthday, setUser_Birthday] = useState("");
    const [imgURL, setImgURL] = useState("");

    const location = useLocation();

    useEffect(() => {
        getUserDetails();

    }, [])

    const getUserDetails = () => {
        axios.get(`${variable.API_URL}Users/${location.state.uid}`)
            .then((response) => {
                const allUserDetails = response.data;
                setUserDetails(allUserDetails);

                setUser_Name(allUserDetails.userName);
                setUser_Gender(allUserDetails.gender);
                setUser_Birthday(allUserDetails.birthday);
                setUser_MartialStatus(allUserDetails.martialStatus);
            })
            .catch(error => console.error(`Error : ${error}`))
    }

    const saveChanges = () => {
        // console.log(user_Gender);
        const userobj = {
            "userID": userDetails.userID,
            "userName": user_Name,
            "birthday": user_Birthday,
            "gender": user_Gender,
            "martialStatus": user_MartialStatus
        }
        axios.post(`${variable.API_URL}Users`, userobj)
            .then(
                getUserDetails()
            ).then(
                window.location.reload()
            )
    }

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
            // console.log(fileInfo);
        });
    };

    const handleImageChange = (event) => {
        let file = event.target.files[0];
        getBase64(file)
            .then((result) => {
                setImgURL(result);
                console.log(result);
                file["base64"] = result;
                console.log(imgURL)
            })
            .then(
                saveImage()
            );
    }

    const saveImage = () => {
        console.log(imgURL)
        axios.put(`${variable.API_URL}Users`, { "userID": userDetails.userID, "imageName": imgURL })
            .then(
                response => response.json()
            ).then(
                axios.get(`${variable.API_URL}Users/${location.state.uid}`)
                    .then((response) => {
                        const allUserDetails = response.data;
                        setUserDetails(allUserDetails);
                    })
                    .catch(error => console.error(`Error : ${error}`))
            )
    }

    const changeUserName = (e) => {
        // console.log(e.target.value);
        setUser_Name(e.target.value);
    }

    const changeUserGender = (e) => {
        // console.log(e.target.value);
        setUser_Gender(e.target.value);
    }
    const changeUserBirthday = (e) => {
        // console.log(e.target.value);
        setUser_Birthday(e.target.value);
    }
    const changeUserMartialStatus = (e) => {
        // console.log(e.target.value);
        setUser_MartialStatus(e.target.value);
    }

    return (
        <div>
            <div className="profile">
                <Navbar uid={location.state.uid} />

                <div className="profile-box">
                    <SideNavbar uid={location.state.uid} />

                    <div className="profile-top">
                        <div className="card-body profile-top-left">
                            <div className="mb-3">
                                {/* <ProfileImage url={defaultImageSrc} /> */}
                                <img className='card-img-top' src={userDetails.imageName} alt="Profile Image" />
                                <input className="btn btn-outline-ligh0 form-control-file" accept='image/*' type="file" id="formFile" onChange={(event) => { handleImageChange(event) }} />
                            </div>
                        </div>
                        <div className="profile-top-right">
                            <div className="profile-top-right-form">
                                <h4><b> User Name</b>: {user_Name}</h4>
                                <h4><b> User ID </b>: {userDetails.userID}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="profile-mid">
                        <h2>Profile</h2><br />
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>User Name</td>
                                    <td>{user_Name}</td>
                                    <td><button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Name</button> </td>
                                </tr>
                                <tr>
                                    <td>Birthday</td>
                                    <td>{user_Birthday}</td>
                                    <td><button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Birthday</button> </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{user_Gender}</td>
                                    <td><button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Gender</button> </td>
                                </tr>
                                <tr>
                                    <td>Martial Status</td>
                                    <td>{user_MartialStatus}</td>
                                    <td><button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Status</button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="profile-login-details">
                        <h2>Login Details</h2><br />
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Mobile Number</td>
                                    <td>{userDetails.userPhoneNo}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>User Email</td>
                                    <td>{userDetails.userEmailID}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td type='password'>{userDetails.password}</td>
                                    {/* <input className='form-control' type="password" value={userDetails.password} /> */}
                                    <td><button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal"> Change Password</button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                        </div>
                        <div className="modal-body">
                            <div className='modal-body-left'>
                                <div className="left-left">
                                    <label htmlFor="profileName">Full Name</label>
                                    <input className='form-control' type="text" defaultValue={user_Name} onChange={(event) => {
                                        changeUserName(event)
                                    }} />
                                </div>
                                <div className="left-right">
                                    <label htmlFor="profileBirthday">Birthday</label>
                                    <input className='form-control' type="text" defaultValue={user_Birthday} onChange={(event) => { changeUserBirthday(event) }} />
                                </div>
                            </div>
                            <div className="modal-body-right">
                                <div className="right-left">
                                    <label htmlFor="profileName">Gender</label>
                                    <input className='form-control' type="text" defaultValue={user_Gender} onChange={(event) => { changeUserGender(event) }} />
                                </div>
                                <div className="right-right">
                                    <label htmlFor="profileBirthday">Martial Status</label>
                                    <input className='form-control' type="text" defaultValue={user_MartialStatus} onChange={(event) => { changeUserMartialStatus(event) }} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { saveChanges() }} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile