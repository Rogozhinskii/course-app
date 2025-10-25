import React from "react";
import "./style.css"


export const Navbar = () => {
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    <a href="./index.html" className="logo"><strong>Awesome</strong> Courses</a>
                    <ul className="nav-list">
                        <li className="nav-list__item">
                            <a href="./index.html" className="nav-list__link nav-list__link--active">Home</a>
                        </li>
                        <li className="nav-list__item">
                            <a href="./projects.html" className="nav-list__link">Projects</a>
                        </li>
                        <li className="nav-list__item">
                            <a href="./contacts.html" className="nav-list__link">Contacts</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}