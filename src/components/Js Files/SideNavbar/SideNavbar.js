import React, { useState, useEffect } from 'react'
import './SideNavbar.css'
import { useNavigate } from 'react-router-dom';


function SideNavbar(props) {

    const [userid, setUserid] = useState(0);

    useEffect(() => {
        setUserid(props.uid);
    }, []);

    function openNav() {
        if (document.getElementById("mySidenav").style.display == "block") {
            document.getElementById("mySidenav").style.display = "none";
        }
        else
            document.getElementById("mySidenav").style.display = "block";
    }

    const navigate = useNavigate();

    const ShowDashboard = () => {
        navigate('/Dashboard', { state: { uid: userid } });
    }

    return (
        <div>
            <div id="mySidenav" className="sidenav">
                <a className="closebtn" onClick={() => { openNav() }}>&times;</a>
                <a href="" onClick={() => { ShowDashboard() }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16">
                    <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                </svg> My Confirmed Bookings</a>
                <a href="" onClick={() => {
                    setUserid(props.uid);
                    console.log(userid);
                    navigate('/Profile', { state: { uid: userid } })
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg> My Profile</a>
                <a href="" onClick={() => {
                    setUserid(props.uid);
                    console.log(userid);
                    navigate('/Transaction', { state: { uid: userid } })
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wallet" viewBox="0 0 16 16">
                        <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                    </svg> Wallet</a>
            </div>
        </div >
    )
}

export default SideNavbar