import React from "react";
import {NavLink} from "react-router-dom";
import "./style.css"


export type ProjectType = {
    id: string;
    title: string;
    skills: string,
    imageUri: string;
    imageBig: string;
}

export interface IProjectProps {
    project: ProjectType;
}

export const Project = (props: IProjectProps) => {
    return (
        <NavLink to={`/project/${props.project.id}`}>
            <li className="project">
                <img className="project__image" src={props.project.imageUri} alt="project img"/>
                <h3 className="project__title">{props.project.title}</h3>
            </li>
        </NavLink>
    )
}