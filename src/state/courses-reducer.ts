import {v1} from "uuid";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppRootState} from "./store";
import {coursesAPI, ResponseStatus} from "./api";
import {setLoadingAC, SetLoadingAction} from "./app-reducer";
import {ICourseType} from "../interfaces/ICourseType";
import {ICourseDirection} from "../interfaces/ICourseDirection";
import toast from "react-hot-toast";
import {IQuestion} from "../interfaces/IQuestion";
import {addCustomTestAC, createCustomTest} from "./customTest-reducer";
import {IContentBlock} from "../interfaces/IContentBlock";


export type AddCourseAction = {
    type: "ADD-COURSE",
    id: string,
    directionId: string,
    hasTest: boolean,
    title: string;
    content: IContentBlock[];
    studyTime: string;
    image: string;
}

export type SetCoursesActionType = {
    type: "SET-COURSES"
    courses: ICourseType[];
}

export type EditCourseAction = {
    type: "EDIT-COURSE",
    courseId: string
}

type SetCoursesDirectionsAction = {
    type: "SET-COURSES-DIRECTIONS"
    directions: ICourseDirection[]
}

type ActionsType =
    SetCoursesActionType
    | AddCourseAction
    | EditCourseAction
    | SetLoadingAction
    | SetCoursesDirectionsAction;


export type CoursesStateType = {
    courses: ICourseType[]
    directions: ICourseDirection[]
}

const initialState: CoursesStateType = {
    courses: [],
    directions: [],
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
                    directionId: action.directionId,
                    hasTest: action.hasTest,
                    title: action.title,
                    content: action.content,
                    studyTime: action.studyTime,
                    image: action.image
                }, ...stateCopy.courses]
            return stateCopy
        }
        case "SET-COURSES-DIRECTIONS": {
            return {
                ...state,
                directions: action.directions
            }
        }
        default:
            return state;
    }
}

export const addCourseAC = (directionId: string, title: string, content: IContentBlock[], studyTime: string, image: string, hasTest: boolean): AddCourseAction => {
    return {
        type: "ADD-COURSE",
        id: v1(),
        directionId: directionId,
        title: title,
        content: content,
        studyTime: studyTime,
        image: image,
        hasTest: hasTest
    };
}

export const setCoursesAC = (courses: ICourseType[]): SetCoursesActionType => {
    return {type: "SET-COURSES", courses: courses}
}

export const setCoursesDirectionsAC = (directions: ICourseDirection[]): SetCoursesDirectionsAction => {
    return {type: "SET-COURSES-DIRECTIONS", directions: directions}
}


type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionsType>

export const requestCourses = (): ThunkType => {

    return async (dispatch, getState) => {

        try {
            dispatch(setLoadingAC(true));
            let res = await coursesAPI.getCourses();
            if (res.status === ResponseStatus.OK) {
                dispatch(setCoursesAC(res.data));
            } else {
                toast.error(`Не удалось загрузить данные: ${res.status}`)
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(`Ошибка: ${e.message}`);
            }
        } finally {
            dispatch(setLoadingAC(false));
        }

    }
}

export const requestCoursesDirections = (): ThunkType => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoadingAC(true));
            let res = await coursesAPI.getCoursesDirections()

            if (res.status === ResponseStatus.OK) {
                dispatch(setCoursesDirectionsAC(res.data));
            } else {
                toast.error(`Не удалось загрузить данные: ${res.status}`)
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(`Ошибка: ${e.message}`);
            }

        } finally {
            dispatch(setLoadingAC(false));
        }
    }
}

export const requestCreateCourse = (directionId: string,
                                    courseTitle: string,
                                    content: IContentBlock[],
                                    studyTime: string,
                                    coverImg: string,
                                    hasTest: boolean,
                                    testTitle: string,
                                    questions: IQuestion[]): ThunkType => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoadingAC(true));
            const addCourseAction = addCourseAC(directionId, courseTitle, content, studyTime, coverImg, hasTest)
            await coursesAPI.createCourse({
                id: addCourseAction.id,
                directionId: addCourseAction.directionId,
                title: addCourseAction.title,
                content: addCourseAction.content,
                studyTime: addCourseAction.studyTime,
                image: addCourseAction.image,
                hasTest: addCourseAction.hasTest,
            })

            dispatch(addCourseAction);

            if (hasTest) {
                await dispatch(createCustomTest(addCourseAction.id, testTitle, questions));
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(`Ошибка: ${e.message}`);
            }
        } finally {
            dispatch(setLoadingAC(false));
        }
    }
}