import React from "react";
import {NavLink} from "react-router-dom";
import "./style.css"
import {ICourseCardProps} from "../../interfaces/ICourseCardProps";
import {ImageUrl} from "../../state/api";


export const CourseCard = (props: ICourseCardProps) => {

    const imageUrl = `${ImageUrl}/${props.image}`

    return (
        <NavLink to={`/courses/${props.id}`}>
            <li className="course">
                <img className="course__image" src={imageUrl} alt="project img"/>
                <h3 className="course__title">{props.title}</h3>
            </li>
        </NavLink>
    )
}