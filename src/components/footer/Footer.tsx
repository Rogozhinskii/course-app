import React from "react";
import "./style.css"

import gitLogo from "./gitHub.svg"
import vkLogo from "./vk.svg"
import lnLogo from "./linkedIn.svg"


export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <ul className="social">
                        <li className="social__item">
                            <a href="#!"><img src={gitLogo} alt="icon"/></a>
                        </li>
                        <li className="social__item">
                            <a href="#!"><img src={vkLogo} alt="icon"/></a>
                        </li>
                        <li className="social__item">
                            <a href="#!"><img src={lnLogo} alt="icon"/></a>
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