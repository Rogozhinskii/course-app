import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css"

export const Header = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <h1 className="header__title">
                    <strong>Добро пожаловать в</strong> <em>Awesome Courses</em> <br/>
                    Ваше пространство для обучения и творчества
                </h1>
                <div className="header__text">
                    <p>Awesome Courses — это интерактивная платформа, где вы можете изучать готовые курсы, смотреть
                        видеоуроки,
                        проходить тесты и создавать собственные обучающие материалы. Развивайтесь в удобном темпе,
                        делитесь знаниями и вдохновляйте других.</p>
                </div>
                <NavLink className="btn" to="/courses">Quick Start</NavLink>
            </div>
        </header>
    )
}