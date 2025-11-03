import {v1} from "uuid";
import {ICustomTestsState} from "../interfaces/ICustomTestsState";
import {IQuestion} from "../interfaces/IQuestion";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppRootState} from "./store";
import {coursesAPI, ResponseStatus} from "./api";
import {setLoadingAC, SetLoadingAction} from "./app-reducer";
import toast from "react-hot-toast";
import {ICustomTest} from "../interfaces/ICustomTest";

export type AddCustomTestAction = {
    type: "ADD-CUSTOM-TEST"
    id: string;
    courseId: string;
    title: string;
    questions: IQuestion[];
}

export type SetCustomTestsAction = {
    type: "SET-CUSTOM-TEST"
    customTests: ICustomTest[];
}

type ActionsType = AddCustomTestAction | SetLoadingAction | SetCustomTestsAction

const initialState: ICustomTestsState = {
    customTests: []
}

export const customTestReducer = (state: ICustomTestsState = initialState, action: ActionsType): ICustomTestsState => {
    switch (action.type) {
        case "ADD-CUSTOM-TEST":
            const stateCopy: ICustomTestsState = {...state};
            stateCopy.customTests = [...stateCopy.customTests, {
                id: action.id,
                courseId: action.courseId,
                title: action.title,
                questions: action.questions,
            }];
            return stateCopy;
        case "SET-CUSTOM-TEST":
            return {
                ...state,
                customTests: action.customTests
            }
        default:
            return state;
    }
}

export const addCustomTestAC = (courseId: string, title: string, questions: IQuestion[]): AddCustomTestAction => {
    return {type: "ADD-CUSTOM-TEST", id: v1(), courseId: courseId, title: title, questions: questions};
}

const setCustomTestsAC = (customTests: ICustomTest[]): SetCustomTestsAction => {
    return {type: "SET-CUSTOM-TEST", customTests}
}

type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionsType>

export const createCustomTest = (courseId: string, title: string, questions: IQuestion[]): ThunkType => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoadingAC(true));
            const ac = addCustomTestAC(courseId, title, questions);
            let data = await coursesAPI.createCustomTest({
                id: ac.id,
                courseId: ac.courseId,
                title: ac.title,
                questions: ac.questions,
            });

            if (data.status === ResponseStatus.CREATED) {
                dispatch(ac)
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

export const requestCustomTests = (): ThunkType => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoadingAC(true));
            const res = await coursesAPI.getCustomTests()
            if (res.status === ResponseStatus.OK) {
                dispatch(setCustomTestsAC(res.data));
            }else {
                toast.error(`Не удалось загрузить пользовательские тесты: ${res.status}`)
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
