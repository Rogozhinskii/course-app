import React from "react";
import {IDirectionInfoProps} from "../../interfaces/IDirectionInfoProps";

export const DirectionInfo = (props: IDirectionInfoProps) => {
    return (
        <li className="content-list__item">
            <h2 className="title-2">{props.title}</h2>
            <p>{props.description}</p>
        </li>
    )
}