import React from "react";


export interface IDirectionInfoProps {
    id: string;
    title: string;
    description: string;
}

export const DirectionInfo = (props: IDirectionInfoProps) => {
    return (
        <li className="content-list__item">
            <h2 className="title-2">{props.title}</h2>
            <p>{props.description}</p>
        </li>
    )
}