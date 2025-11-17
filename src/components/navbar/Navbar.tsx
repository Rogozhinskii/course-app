import React from "react";
import "./style.css"
import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/useAuth";
import {Roles} from "../../interfaces/Roles";

export const Navbar = () => {
    const activeLink = "nav-list__link nav-list__link--active";
    const normalLink = "nav-list__link";

    const {auth} = useAuth();

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
                            <NavLink to="/" className={({isActive}) => getClassName(isActive)}>Домой</NavLink>
                        </li>
                        <li className="nav-list__item">
                            <NavLink to="/courses" className={({isActive}) => getClassName(isActive)}>Курсы</NavLink>
                        </li>
                        <li className="nav-list__item">
                            <NavLink to="/contacts"
                                     className={({isActive}) => getClassName(isActive)}>Контакты</NavLink>
                        </li>
                        <li className="nav-list__item">
                            <NavLink to="/login" className={({isActive}) => getClassName(isActive)}>Войти</NavLink>
                        </li>
                        {
                            auth?.roles.includes(Roles.Admin) && <li className="nav-list__item">
                                <NavLink to="/admin-panel" className={({isActive}) => getClassName(isActive)}>Панель администратора</NavLink>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}