import React from "react";
import "./style.css"
import {Link} from "react-router-dom";

export interface IButtonIconProps {
    link: string;
    imgUrl: string;
    text: string;
    btnStyle: BtnStyles;
}

type BtnStyles = "btn" | "btn-outline" | "none";

export const LinkButton = (props: IButtonIconProps) => {

    return (
        <Link to={props.link}
              className={props.btnStyle}
              target="_blank"
              rel="noopener noreferrer"
        >
            <img src={props.imgUrl} alt="icon"/>
            {props.text}
        </Link>
    )
}


