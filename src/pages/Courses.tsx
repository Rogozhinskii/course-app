import React, {useEffect} from "react";
import {CourseCard} from "../components/course/CourseCard";
import "./style.css"
import {Filter} from "../components/filter/Filter";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../state/store";
import {requestCourses} from "../state/courses-reducer";

export const Courses = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestCourses())
    }, []);

    const state = useAppSelector(state => state.coursesState);

    return (
        <main className="section">
            <div className="container">
                <div className="courses__wrapper">
                    <Filter timeFilter={"all"} hasTest={true}/>
                    <div className="courses-container">
                        <div className="courses-title-wrapper">
                            <h2 className="title-1">Курсы</h2>
                            <NavLink className="btn btn-create" to="/course/create">Создать</NavLink>
                        </div>
                        <ul className="courses">
                            {
                                state.courses.map((c) =>
                                    <CourseCard key={c.id}
                                                id={c.id}
                                                title={c.title}
                                                image={c.image}/>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}