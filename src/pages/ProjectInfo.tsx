import React from "react";
import {BtnGitHub} from "../components/btnGitHub/BtnGithub";

export interface IProjectInfoProps {
    id: string;
    title: string;
    skills: string;
    image: string;
}

export const ProjectInfo = (props: IProjectInfoProps) => {
    return (
        <main className="section">
            <div className="container">
                <div className="project-details">
                    <h2 className="title-1">{props.title}</h2>

                    <img src={props.image} alt="" className="project-details__cover"/>
                    <div className="project-details__desc">
                        <p>{props.skills}</p>
                    </div>

                    <BtnGitHub />

                </div>
            </div>
        </main>
    )
}