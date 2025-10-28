import {v1} from "uuid";
import {ICustomTestsState} from "../interfaces/ICustomTestsState";
import {IQuestion} from "../interfaces/IQuestion";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppRootState} from "./store";
import {coursesAPI, ResponseStatus} from "./api";
import {toggleIsFetchingAC, ToggleIsFetchingActionType} from "../interfaces/CommonActions";

export type AddCustomTestAction = {
    type: "ADD-CUSTOM-TEST"
    id: string;
    courseId: string;
    title: string;
    questions: IQuestion[];
}

type ActionsType = AddCustomTestAction | ToggleIsFetchingActionType


export const customTestReducer = (state: ICustomTestsState, action: ActionsType): ICustomTestsState => {
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
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
}

export const addCustomTestAC = (courseId: string, title: string, questions: IQuestion[]): AddCustomTestAction => {
    return {type: "ADD-CUSTOM-TEST", id: v1(), courseId: courseId, title: title, questions: questions};
}

type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionsType>

export const createCustomTest = (courseId: string, title: string, questions: IQuestion[]): ThunkType => {
    return async (dispatch, getState) => {
        try {
            dispatch(toggleIsFetchingAC(true));
            const ac = addCustomTestAC(courseId, title, questions);
            let data = await coursesAPI.createCustomTest({
                id: ac.id,
                courseId: ac.courseId,
                title: ac.title,
                questions: ac.questions,
            });

            if(data.status === ResponseStatus.CREATED) {
                dispatch(ac)
            }
        }finally {
            dispatch(toggleIsFetchingAC(false));
        }

    }

}