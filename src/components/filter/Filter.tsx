import {useCallback, useEffect, useState} from "react";
import {Checkbox} from "../checkbox/Checkbox";
import {StudyTime} from "../../interfaces/StudyTime";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {requestCourses, requestCoursesDirections, requestFilterCourses} from "../../state/courses-reducer";
import { ICourseDirection} from "../../interfaces/ICourseDirection";

import "./style.css"

export type TimeFilterType = "all" | StudyTime.LESS_THAN_15 | StudyTime.MORE_THAN_15;

interface IFilterProps {

}

export const Filter = (props: IFilterProps) => {

    const dispatch = useAppDispatch();
    const [hasTest, setHasTest] = useState<boolean|null>(null);
    const [timeFilter, setTimeFilter] = useState<TimeFilterType|null>(null)
    const [selectedId, setSelectedId] = useState<number|null>(null)

    useEffect(() => {
        dispatch(requestCoursesDirections())
    }, [dispatch]);

    const directions = useAppSelector(state => state.coursesState.directions);

    const directionChangeHandler = (e: React.MouseEvent<HTMLLIElement>, newDirectionId: number) => {
        setSelectedId(newDirectionId)
        dispatch(requestFilterCourses({ studyTime: timeFilter ?? undefined, directionId: newDirectionId, hasTest: !!hasTest }))
    }

    const hasTestChangeHandler = (newHasTest: boolean) => {

        setHasTest(newHasTest)
        dispatch(requestFilterCourses({ studyTime: timeFilter ?? undefined, directionId: selectedId ?? undefined, hasTest: newHasTest }))
    }

    const onAllClickHandler = () => {
        setTimeFilter(null)
        setSelectedId(null)
        setHasTest(null)
        dispatch(requestFilterCourses({ studyTime: undefined, directionId: undefined, hasTest: undefined }))
    }

    const onLess15ClickHandler = () => {
        setTimeFilter(StudyTime.LESS_THAN_15)
        dispatch(requestFilterCourses({ studyTime: StudyTime.LESS_THAN_15, directionId: selectedId ?? undefined, hasTest: hasTest ?? undefined }))
    }

    const onMore15ClickHandler = () => {
        setTimeFilter(StudyTime.MORE_THAN_15)
        dispatch(requestFilterCourses({ studyTime: StudyTime.MORE_THAN_15, directionId: selectedId ?? undefined, hasTest: hasTest ?? undefined }))
    }

    const onResetFilter =useCallback(() => {
        setTimeFilter(null)
        setHasTest(null)
        setSelectedId(null)
        dispatch(requestCourses())
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
                <button className={timeFilter === null ? "btn btn-filter" : "btn-outline btn-filter"}
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