import React from "react";
import {useParams} from 'react-router-dom'
import "./style.css"
import {useAppSelector} from "../state/store";
import {IContentBlock} from "../interfaces/IContentBlock";
import {CourseContent} from "../components/courseContent/CourseContent";

export const CourseInfo = () => {
    const {id} = useParams();
    const state = useAppSelector(state => state.coursesState);
    const course = state.courses.find((course) => course.id === id);
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
                                                                                      content={d.content}/>)
                        }
                    </ul>

                    <button>
                        Test
                    </button>
                </div>

            </div>
        </main>
    )
}