import React from "react";
import "./NavBar.css"

const NavBar = () => {
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
                                    var requestOptions = {
                                        method: 'POST',
                                        redirect: 'follow'
                                    };
                                    
                                    fetch("http://localhost:8080/api/auth/logout", requestOptions)
                                        .then(response => response.text())
                                        .then(result => {
                                            console.log(result);
                                            window.location.replace(result);
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