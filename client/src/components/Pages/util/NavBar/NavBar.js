import React from "react";
import { logoutUser } from "../../../../api/navbar/navbarBackend";
import { useUserInfo } from "../AuthContext/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
    const { userInfo, setUserInfo } = useUserInfo();
    const naviagte = useNavigate();
    return (
        <div className="topnav">
            <div className="container">
                <div className="left-nav">
                        <a href="/fuel" className="compName"><span>Fi</span>eco</a>
                    </div>
                <nav>  
                    <div className="right-nav">
                        <ul>
                            <li><a href="/fuel">Home</a></li>
                            <li><a href="/profile">Profile</a></li>
                            {/* <li><a href="http://localhost:8080/api/auth/logout">Sign Out</a></li> */ /* <- this wasn't working on angel's computer */}
                            <li><button onClick={() => {
                                    logoutUser()
                                        .then(result => {
                                            console.log(result);
                                            setUserInfo({userID: ""});
                                            console.log(userInfo);
                                            localStorage.clear();
                                            naviagte('/');
                                        })
                                        .catch(error => console.log('error', error));
                                        }}>
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;