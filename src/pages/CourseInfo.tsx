import React from "react";
import {useParams} from 'react-router-dom'
import {CourseType} from "../components/course/CourseCard";
import {LinkButton} from "../components/buttonIcon/LinkButton";
import gitIcon from "./../img/icons/gitHub-black.svg"
import "./style.css"
import {useAppSelector} from "../state/store";

export interface IProjectInfoProps {
    courses: CourseType[]
}

export const CourseInfo = () => {
    const {id} = useParams();
    const state = useAppSelector(state => state.coursesState);
    const course = state.courses.find((course) => course.id === id);
    return (
        <main className="section">
            <div className="container">
                <div className="course-details">
                    <h2 className="title-1">{course?.title}</h2>

                    <img src={course?.imageBig} alt="" className="course-details__cover"/>
                    <div className="course-details__desc">
                        <p>{course?.skills}</p>
                    </div>

                    <LinkButton text={"Some button"} link={"https://github.com"} imgUrl={gitIcon} btnStyle={"btn-outline"} />
                </div>
            </div>
        </main>
    )
}