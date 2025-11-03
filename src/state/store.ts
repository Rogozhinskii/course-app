import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {coursesReducer} from "./courses-reducer";
import {directionInfoReducer} from "./directionInfo-reducer";
import {customTestReducer} from "./customTest-reducer";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    coursesState: coursesReducer,
    directionsInfosState: directionInfoReducer,
    customTestReducer: customTestReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppRootState>()


// @ts-ignore
window.state = store.getState()