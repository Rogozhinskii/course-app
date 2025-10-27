import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {coursesReducer} from "./courses-reducer";


const rootReducer = combineReducers({
    coursesState: coursesReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppRootState>()