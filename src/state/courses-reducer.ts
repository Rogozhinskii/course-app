import {v1} from "uuid";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppRootState} from "./store";
import {coursesAPI, ResponseStatus} from "./api";
import {setLoadingAC, SetLoadingAction} from "./app-reducer";
import {ICourseType} from "../interfaces/ICourseType";
import {ICourseDirection} from "../interfaces/ICourseDirection";
import toast from "react-hot-toast";
import {IQuestion} from "../interfaces/IQuestion";
import {createCustomTest} from "./customTest-reducer";
import {IContentBlock} from "../interfaces/IContentBlock";
import {TimeFilterType} from "../components/filter/Filter";
import {StudyTime} from "../interfaces/StudyTime";


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

type ChangeCoursesFilter = {
    type: "CHANGE-COURSES-FILTER"
    directionId: string
    timeFilter: TimeFilterType
    hasTest: boolean
}

type ActionsType =
    SetCoursesActionType
    | AddCourseAction
    | EditCourseAction
    | SetLoadingAction
    | SetCoursesDirectionsAction
    | ChangeCoursesFilter;


export type CoursesStateType = {
    courses: ICourseType[]
    directions: ICourseDirection[]
    filteredCourses: ICourseType[]
}

const initialState: CoursesStateType = {
    courses: [],
    directions: [],
    filteredCourses: [],
}

export const coursesReducer = (state = initialState, action: ActionsType): CoursesStateType => {
    switch (action.type) {
        case "SET-COURSES":
            return {
                ...state,
                courses: action.courses,
                filteredCourses: action.courses
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
        case "CHANGE-COURSES-FILTER": {
            let filtered = action.directionId !== "all"
                ? state.courses.filter(course => course.directionId === action.directionId
                    && course.hasTest === action.hasTest)
                : state.courses.filter(course => course.hasTest === action.hasTest);

            if (action.timeFilter !== "all") {
                filtered = filtered.filter(course => {
                    if (action.timeFilter === StudyTime.LESS_THAN_15) {
                        return course.studyTime === StudyTime.LESS_THAN_15;
                    }
                    if (action.timeFilter === StudyTime.MORE_THAN_15) {
                        return course.studyTime === StudyTime.MORE_THAN_15;
                    }
                    return true;
                });
            }
            return {
                ...state,
                filteredCourses: filtered
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

export const changeCoursesFilterAC = (directionId: string, hasTest: boolean, timeFilter: TimeFilterType): ChangeCoursesFilter => {
    return {type: "CHANGE-COURSES-FILTER", directionId: directionId, timeFilter: timeFilter, hasTest: hasTest};
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