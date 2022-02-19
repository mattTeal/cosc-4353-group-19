import React from "react";
import "./NavBar.css"

const NavBar = () => {
    return (
        <div className="topnav">
            <div className="container">
                <div className="left-nav">
                    <a href="/fuel" className="compName"><span>Fi</span>eco</a>
                    <a href="/profile">Profile</a>
                    <a href="/">Sign Out</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;