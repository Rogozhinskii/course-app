import {useEffect} from "react";
import {Checkbox} from "../checkbox/Checkbox";
import {StudyTime} from "../../interfaces/StudyTime";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {requestCoursesDirections} from "../../state/courses-reducer";
import {ICourseDirection} from "../../interfaces/ICourseDirection";

import "./style.css"

type TimeFilterType = "all" | StudyTime.LESS_THAN_15 | StudyTime.MORE_THAN_15;

interface IFilterProps {
    timeFilter: TimeFilterType
    hasTest: boolean
}

export const Filter = (props: IFilterProps) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestCoursesDirections())
    }, [dispatch]);

    const directions = useAppSelector(state => state.coursesState.directions);

    return (
        <div className="filter-container">
            <h3 className="filter-title">Поиск материалов</h3>
            <ul className="filter-directions">
                {
                    directions.map((d: ICourseDirection) => {
                        return <li role="button" className="filter-direction">{d.name}</li>
                    })
                }
            </ul>
            <h5 className="filter-title">Время прочтения</h5>
            <div className="time-filter">
                <button className={props.timeFilter === "all" ? "btn btn-filter" : "btn-outline btn-filter"}>All</button>
                <button
                    className={props.timeFilter === StudyTime.LESS_THAN_15 ? "btn btn-filter" : "btn-outline btn-filter"}>{StudyTime.LESS_THAN_15}</button>
                <button
                    className={props.timeFilter === StudyTime.MORE_THAN_15 ? "btn btn-filter" : "btn-outline btn-filter"}>{StudyTime.MORE_THAN_15}</button>
            </div>
            <Checkbox title="Есть тест"/>
        </div>
    )
}