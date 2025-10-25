import React from "react";
import "./style.css"

export interface IButtonIconProps {
    link: string;
    imgUrl: string;
    text: string;
    btnStyle: BtnStyles;
}

type BtnStyles = "btn" | "btn-outline" | "none";

export const ButtonIcon = (props: IButtonIconProps) => {

    return (
        <a href={props.link}
           className={props.btnStyle}
           target="_blank"
           rel="noopener noreferrer">
            <img src={props.imgUrl} alt="icon"/>

            {props.text}
        </a>
    )
}


