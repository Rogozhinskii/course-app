import {useCallback, useEffect, useState} from "react";
import {Checkbox} from "../checkbox/Checkbox";
import {StudyTime} from "../../interfaces/StudyTime";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {changeCoursesFilterAC, requestCoursesDirections} from "../../state/courses-reducer";
import {ICourseDirection} from "../../interfaces/ICourseDirection";

import "./style.css"

export type TimeFilterType = "all" | StudyTime.LESS_THAN_15 | StudyTime.MORE_THAN_15;

interface IFilterProps {

}

export const Filter = (props: IFilterProps) => {

    const dispatch = useAppDispatch();
    const [hasTest, setHasTest] = useState(false);
    const [timeFilter, setTimeFilter] = useState<TimeFilterType>("all")
    const [directionId, setDirectionId] = useState<string>("all")
    const [selectedId, setSelectedId] = useState<string|null>(null)

    useEffect(() => {
        dispatch(requestCoursesDirections())
    }, [dispatch]);

    const directions = useAppSelector(state => state.coursesState.directions);

    const directionChangeHandler = (e: React.MouseEvent<HTMLLIElement>, newDirectionId: string) => {
        setDirectionId(newDirectionId)
        setSelectedId(newDirectionId)
        dispatch(changeCoursesFilterAC(newDirectionId, hasTest, timeFilter))
    }

    const hasTestChangeHandler = (newHasTest: boolean) => {
        debugger
        setHasTest(newHasTest)
        dispatch(changeCoursesFilterAC(directionId, newHasTest, timeFilter))
    }

    const onAllClickHandler = () => {
        debugger
        setTimeFilter("all")
        dispatch(changeCoursesFilterAC(directionId, hasTest, "all"))
    }

    const onLess15ClickHandler = () => {
        setTimeFilter(StudyTime.LESS_THAN_15)
        dispatch(changeCoursesFilterAC(directionId, hasTest, StudyTime.LESS_THAN_15))
    }

    const onMore15ClickHandler = () => {
        setTimeFilter(StudyTime.MORE_THAN_15)
        dispatch(changeCoursesFilterAC(directionId, hasTest, StudyTime.MORE_THAN_15))
    }

    const onResetFilter =useCallback(() => {
        setTimeFilter("all")
        setDirectionId("all")
        setHasTest(false)
        setSelectedId(null)
        dispatch(changeCoursesFilterAC("all", false, "all"))
    }, [dispatch]);


    return (

        <div className="filter-container">
            <h3 className="filter-title">Поиск материалов</h3>
            <ul className="filter-directions">
                {
                    directions.map((d: ICourseDirection) => {
                        const isSelected = selectedId === d.id;

                        return <li key={d.id} role="button"
                                   onClick={(e)=>directionChangeHandler(e, d.id)}
                                   className={`filter-direction${isSelected ? "-active": ""}`}>{d.name}
                        </li>
                    })
                }
            </ul>
            <h5 className="filter-title">Время прочтения</h5>
            <div className="time-filter">
                <button className={timeFilter === "all" ? "btn btn-filter" : "btn-outline btn-filter"}
                        onClick={onAllClickHandler}>All
                </button>
                <button
                    className={timeFilter === StudyTime.LESS_THAN_15 ? "btn btn-filter" : "btn-outline btn-filter"}
                    onClick={onLess15ClickHandler}>{StudyTime.LESS_THAN_15}</button>
                <button
                    className={timeFilter === StudyTime.MORE_THAN_15 ? "btn btn-filter" : "btn-outline btn-filter"}
                    onClick={onMore15ClickHandler}>{StudyTime.MORE_THAN_15}</button>
            </div>
            <Checkbox title="Есть тест" callback={hasTestChangeHandler}/>
            <button className="btn" onClick={onResetFilter}>Сбросить</button>
        </div>
    )
}