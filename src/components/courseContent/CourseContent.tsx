import React from "react";
import "./style.css"

export interface  ICourseContent {
    title: string,
    content: string,
}

export const CourseContent = (props: ICourseContent) =>{

    return (
        <li className="course-content-list__item ">
            <h2 className="title-2">{props.title}</h2>
            <p>{props.content}</p>
        </li>
    )
}