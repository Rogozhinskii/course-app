import React from "react";
import "./style.css"

export const Header = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <h1 className="header__title">
                    <strong>Здесь должен быть</strong> <em>Вай</em> <br/>
                    текст заголовка
                </h1>
                <div className="header__text">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis ducimus, accusamus
                        veniam
                        nulla
                        explicabo ex est minus voluptate earum? Quasi atque consequuntur exercitationem
                        laudantium
                        impedit
                        qui, earum molestias rem commodi.</p>
                </div>
                <a href="!#" className="btn">Download</a>
            </div>
        </header>
    )
}