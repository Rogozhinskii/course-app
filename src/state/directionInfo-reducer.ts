import {IDirectionInfo} from "../interfaces/IDirectionInfo";
import {ThunkAction} from "@reduxjs/toolkit";
import {AppRootState} from "./store";
import {coursesAPI} from "./api";
import {IDirectionInfoState} from "../interfaces/IDirectionInfoState";

const initialState: IDirectionInfoState = {
    directionsInfos: []
}

export type SetDirectionInfoAction = {
    type: "SET-DIRECTIONS-INFOS"
    directionsInfos: IDirectionInfo[]
}

type ActionType = SetDirectionInfoAction

export const directionInfoReducer = (state= initialState, action:ActionType) : IDirectionInfoState => {
    switch (action.type) {
        case "SET-DIRECTIONS-INFOS":
            return {
                ...state,
                directionsInfos: action.directionsInfos
            }
        default:
            return state
    }
}

export const setDirectionInfosAC =(directionsInfos : IDirectionInfo[]): SetDirectionInfoAction=>{
    return {type: "SET-DIRECTIONS-INFOS", directionsInfos: directionsInfos};
}

type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionType>

export const requestDirectionsInfos =():ThunkType => {
    return async (dispatch, getState) => {
        let data = await coursesAPI.getDirectionsInfos();
        dispatch(setDirectionInfosAC(data));
    }
}