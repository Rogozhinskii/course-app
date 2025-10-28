import {CourseType} from "../components/course/CourseCard";
import {v1} from "uuid";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppRootState} from "./store";
import {coursesAPI} from "./api";
import {setLoadingAC, SetLoadingAction} from "./app-reducer";


export type AddCourseAction = {
    type: "ADD-COURSE",
    title: string;
    skills: string;
    image: string;
}

export type SetCoursesActionType = {
    type: "SET-COURSES"
    courses: CourseType[];
}

export type EditCourseAction = {
    type: "EDIT-COURSE",
    courseId: string
}

type ActionsType = SetCoursesActionType | AddCourseAction | EditCourseAction | SetLoadingAction;


export type CoursesStateType = {
    courses: CourseType[]
}

const initialState: CoursesStateType = {
    courses: []
}

export const coursesReducer = (state = initialState, action: ActionsType): CoursesStateType => {
    switch (action.type) {
        case "SET-COURSES":
            return {
                ...state,
                courses: action.courses,
            }
        case "ADD-COURSE": {
            const stateCopy = {...state}
            stateCopy.courses = [
                {
                    id: v1(),
                    title: action.title,
                    skills: action.skills,
                    image: action.image
                }, ...stateCopy.courses]
            return stateCopy
        }
        default:
            return state;
    }
}

export const addCourceAC = (title: string, skills: string, image: string): AddCourseAction => {
    return {type: "ADD-COURSE", title: title, skills: skills, image: image};
}

export const setCoursesAC = (courses: CourseType[]): SetCoursesActionType => {
    return {type: "SET-COURSES", courses: courses}
}


type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionsType>

export const requestCourses = (): ThunkType => {

    return async (dispatch, getState) => {

        try {
            dispatch(setLoadingAC(true));
            let data = await coursesAPI.getCourses();
            dispatch(setCoursesAC(data));
        } finally {
            dispatch(setLoadingAC(false));
        }

    }
}