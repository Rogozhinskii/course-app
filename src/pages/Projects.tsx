import React from "react";
import {Project, ProjectType} from "../components/project/Project";
import "./style.css"


export interface IProjectsProps {
    projects: ProjectType[];
}

export const Projects = (props: IProjectsProps) => {
    return (
        <main className="section">
            <div className="container">
                <h2 className="title-1">Projects</h2>
                <ul className="projects">
                    {
                        props.projects.map((p) => <Project key={p.id} project={p} />)
                    }
                </ul>
            </div>
        </main>
    )
}