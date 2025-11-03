import React from "react";
import {NavLink} from "react-router-dom";
import "./style.css"
import {ICourseCardProps} from "../../interfaces/ICourseCardProps";





export const CourseCard = (props: ICourseCardProps) => {
    return (
        <NavLink to={`/course/${props.id}`}>
            <li className="course">
                <img className="course__image" src={props.image} alt="project img"/>
                <h3 className="course__title">{props.title}</h3>
            </li>
        </NavLink>
    )
}