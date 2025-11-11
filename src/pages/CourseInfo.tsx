import React, {useEffect} from "react";
import {useParams} from 'react-router-dom'
import "./style.css"
import {useAppDispatch, useAppSelector} from "../state/store";
import {IContentBlock} from "../interfaces/IContentBlock";
import {CourseContent} from "../components/courseContent/CourseContent";
import {ICourseType} from "../interfaces/ICourseType";
import {requestCourse,} from "../state/courses-reducer";
import {CustomTest} from "../components/customTest/CustomTest";
import {ImageUrl} from "../state/api";

export const CourseInfo = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {courses} = useAppSelector(state => state.coursesState);
    const course = courses.find((course: ICourseType) => course.id === id);
    useEffect(() => {
        dispatch(requestCourse(String(id)))
    }, [dispatch, id]);

    const imageUrl = `${ImageUrl}/${course?.image}`

    return (
        <main className="section">
            <div className="container">
                <div className="course-details">
                    <h2 className="title-1">{course?.title}</h2>

                    <img src={imageUrl} alt="" className="course-details__cover"/>

                    <ul className="course-content-list">
                        {

                            course?.content?.map((d: IContentBlock) => <CourseContent key={d.id}
                                                                                      title={d.title}
                                                                                      content={d.content}
                            />)
                        }
                    </ul>


                    {
                        course?.hasTest && <CustomTest courseId={course?.id}/>
                    }
                </div>

            </div>
        </main>
    )
}