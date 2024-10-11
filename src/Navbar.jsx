import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
let Navbar = () => {
    let userContext = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-style">
            <div className="container-fluid">
                <a className="navbar-brand" href="/#">e-Commerce</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* below two Register & Login components should display when user not loggedIn case */}
                        {!userContext.user.isLoggedIn ? (<li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/" activeClassName="active">Login</NavLink>
                        </li>) : ("")}
                        {!userContext.user.isLoggedIn ? (<li className="nav-item">
                            <NavLink className="nav-link" to="/Register" activeClassName="active">Register</NavLink>
                        </li>) : ("")}

                        {userContext.user.isLoggedIn ? (<li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard" activeClassName="active">
                                <i className="fa fa-dashboard"></i>DashBoard</NavLink>
                        </li>) : ("")}


                    </ul>
                    {/* this will set rightside of the navbar */}
                    {/* this for when ever user logged in it will show onle otherwise no */}
                    {userContext.user.isLoggedIn ? (<div style={{ marginRight: 100 }} >
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" activeClassName="active">
                                    <i className="fa fa-user-circle"></i>{""}
                                    {userContext.user.currentUserName}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="/">Log Out</NavLink></li>

                                </ul>
                            </li>
                        </ul>
                    </div>) : ("")}


                    {/* end the right */}



                </div>
            </div>
        </nav>
    );
}
export default Navbar;