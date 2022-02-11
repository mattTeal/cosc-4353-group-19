import React from "react";
import "./NavBar.css"


const NavBar = () => {
    return (
        <div className="topnav">
            <a href="/">Home</a>
            <a href="/profile">Profile</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    );
};

export default NavBar;