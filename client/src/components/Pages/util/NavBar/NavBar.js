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
                            <li><a href="http://localhost:8080/api/auth/logout">Sign Out</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;