import React from "react";
import {NavLink} from "react-router-dom";
import "./style.css"


export type CourseType = {
    id: string;
    title: string;
    skills: string,
    imageUri: string;
    imageBig: string;
}

export interface ICourseProps {
    course: CourseType;
}

export const Course = (props: ICourseProps) => {
    return (
        <NavLink to={`/course/${props.course.id}`}>
            <li className="course">
                <img className="course__image" src={props.course.imageUri} alt="project img"/>
                <h3 className="course__title">{props.course.title}</h3>
            </li>
        </NavLink>
    )
}