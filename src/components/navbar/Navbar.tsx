import React from "react";
import "./style.css"
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    const activeLink = "nav-list__link nav-list__link--active";
    const normalLink = "nav-list__link";

    const getClassName = (isActive: boolean) => {
        return isActive ? activeLink : normalLink;
    }


    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    <NavLink to="/" className="logo">
                        <strong>Awesome</strong> Courses
                    </NavLink>
                    <ul className="nav-list">
                        <li className="nav-list__item">
                            <NavLink to="/" className={({isActive}) => getClassName(isActive)}>Home</NavLink>
                        </li>
                        <li className="nav-list__item">
                            <NavLink to="/projects" className={({isActive}) => getClassName(isActive)}>Projects</NavLink>
                        </li>
                        <li className="nav-list__item">
                            <NavLink to="/contacts" className={({isActive}) => getClassName(isActive)}>Contacts</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}