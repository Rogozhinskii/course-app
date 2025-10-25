import React from "react";
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
        <li className="project">
            <a href="./project-page.html">
                <img className="project__image" src={props.project.imageUri} alt="project img"/>
                <h3 className="project__title">{props.project.title}</h3>
            </a>
        </li>
    )
}