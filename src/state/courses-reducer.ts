import {CourseType} from "../components/course/CourseCard";
import {v1} from "uuid";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppRootState} from "./store";
import {coursesAPI} from "./api";

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

export type ToggleIsFetchingActionType = {
    type: "TOGGLE-IS-FETCHING"
    isFetching: boolean;
}

type ActionsType = SetCoursesActionType | AddCourseAction | EditCourseAction | ToggleIsFetchingActionType;


export type CoursesStateType = {
    courses: CourseType[]
    isFetching: boolean
}

const initialState: CoursesStateType = {
    courses: [],
    isFetching: false
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
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
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

export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {type: "TOGGLE-IS-FETCHING", isFetching: isFetching}
}

type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionsType>

export const requestCourses = (): ThunkType => {

    return async (dispatch, getState) => {

        dispatch(toggleIsFetchingAC(true));
        let data = await coursesAPI.getCourses();
        dispatch(toggleIsFetchingAC(false));
        dispatch(setCoursesAC(data));
    }
}