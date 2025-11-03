import React, {useEffect} from "react";
import {useParams} from 'react-router-dom'
import "./style.css"
import {useAppDispatch, useAppSelector} from "../state/store";
import {IContentBlock} from "../interfaces/IContentBlock";
import {CourseContent} from "../components/courseContent/CourseContent";
import {ICourseType} from "../interfaces/ICourseType";
import {requestCourses} from "../state/courses-reducer";

export const CourseInfo = () => {

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {courses} = useAppSelector(state => state.coursesState);
    const course = courses.find((course: ICourseType) => course.id === id);
    useEffect(() => {
        if (courses.length === 0) {
            dispatch(requestCourses())
        }
    }, [dispatch, courses.length]);


    return (
        <main className="section">
            <div className="container">
                <div className="course-details">
                    <h2 className="title-1">{course?.title}</h2>

                    <img src={course?.image} alt="" className="course-details__cover"/>

                    <ul className="course-content-list">
                        {

                            course?.content?.map((d: IContentBlock) => <CourseContent key={d.id}
                                                                                      title={d.title}
                                                                                      content={d.content}
                            />)
                        }
                    </ul>


                    {
                        course?.hasTest &&
                        <button>
                            Test
                        </button>
                    }
                </div>

            </div>
        </main>
    )
}