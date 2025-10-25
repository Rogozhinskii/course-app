import React from "react";
import {BtnGitHub} from "../components/btnGitHub/BtnGithub";
import {useParams} from 'react-router-dom'
import {ProjectType} from "../components/project/Project";

export interface IProjectInfoProps {
    projects: ProjectType[]
}

export const ProjectInfo = (props: IProjectInfoProps) => {
    const {id} = useParams();
    const project = props.projects.find((project) => project.id === id);

    return (
        <main className="section">
            <div className="container">
                <div className="project-details">
                    <h2 className="title-1">{project?.title}</h2>

                    <img src={project?.imageBig} alt="" className="project-details__cover"/>
                    <div className="project-details__desc">
                        <p>{project?.skills}</p>
                    </div>

                    <BtnGitHub />

                </div>
            </div>
        </main>
    )
}