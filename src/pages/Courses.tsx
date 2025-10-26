import React from "react";
import {Course, CourseType} from "../components/course/Course";
import "./style.css"
import {Filter} from "../components/filter/Filter";
import {NavLink} from "react-router-dom";

export interface ICourseProps {
    courses: CourseType[];
}

export const Courses = (props: ICourseProps) => {
    return (
        <main className="section">
            <div className="container">
                <div className="courses__wrapper">
                    <Filter timeFilter={"all"} hasTest={true}/>
                    <div>
                        <div className="courses-title-wrapper">
                            <h2 className="title-1">Курсы</h2>
                            <NavLink className="btn btn-create" to="/course/create">Создать</NavLink>
                        </div>
                        <ul className="courses">
                            {
                                props.courses.map((c) => <Course key={c.id} course={c} />)
                            }
                        </ul>
                    </div>

                </div>

            </div>
        </main>
    )
}