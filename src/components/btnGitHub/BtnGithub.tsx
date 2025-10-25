import git from "./gitHub-black.svg";
import React from "react";
import "./style.css"


export const BtnGitHub = () => {
    return (
        <a href="!#" target="_blank" rel="noreferrer" className="btn-outline">
            <img src={git} alt=""/>
            Some button
        </a>
    )
}