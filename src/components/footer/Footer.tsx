import React from "react";
import "./style.css"

import gitLogo from "./gitHub.svg"
import vkLogo from "./vk.svg"
import {LinkButton} from "../linkButton/LinkButton";


export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <ul className="social">
                        <li className="social__item">
                            <LinkButton link={"https://github.com/Rogozhinskii/course-app"} imgUrl={gitLogo} text={""} btnStyle={"none"}/>
                        </li>
                        <li className="social__item">
                            <LinkButton link={"https://vk.ru"} imgUrl={vkLogo} text={""} btnStyle={"none"} />
                        </li>
                    </ul>
                    <div className="copyright">
                        <p>2025</p>
                    </div>
                </div>
            </div>

        </footer>
    )
}