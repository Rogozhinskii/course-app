import {useCallback, useEffect, useState} from "react";
import {Checkbox} from "../checkbox/Checkbox";
import {StudyTime} from "../../interfaces/StudyTime";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {requestCourses, requestCoursesDirections, requestFilterCourses} from "../../state/courses-reducer";
import {ICourseDirection} from "../../interfaces/ICourseDirection";
import "./style.css"

export type TimeFilterType = StudyTime.LESS_THAN_15 | StudyTime.MORE_THAN_15;

interface IFilterProps {

}

export const Filter = (props: IFilterProps) => {

    const dispatch = useAppDispatch();
    const [hasTest, setHasTest] = useState<boolean | null>(null);
    const [timeFilter, setTimeFilter] = useState<TimeFilterType | null>(null)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const directions = useAppSelector(state => state.coursesState.directions);

    useEffect(() => {
        dispatch(requestCoursesDirections())
    }, [dispatch]);

    const applyFilters = useCallback(() => {
        dispatch(requestFilterCourses({
            studyTime: timeFilter ?? undefined,
            directionId: selectedId ?? undefined,
            hasTest: hasTest ?? undefined
        }))
    }, [dispatch, timeFilter, selectedId, hasTest])

    useEffect(() => {
        applyFilters()
    }, [applyFilters]);

    const onResetFilter = useCallback(() => {
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

                        return <li key={d.id}
                                   role="button"
                                   onClick={(e) => setSelectedId(d.id)}
                                   className={`filter-direction${isSelected ? "-active" : ""}`}>{d.name}
                        </li>
                    })
                }
            </ul>
            <h5 className="filter-title">Время прочтения</h5>
            <div className="time-filter">
                <button className={timeFilter === null ? "btn btn-filter" : "btn-outline btn-filter"}
                        onClick={() => setTimeFilter(null)}>All
                </button>
                <button
                    className={timeFilter === StudyTime.LESS_THAN_15 ? "btn btn-filter" : "btn-outline btn-filter"}
                    onClick={() => setTimeFilter(StudyTime.LESS_THAN_15)}>{StudyTime.LESS_THAN_15}</button>
                <button
                    className={timeFilter === StudyTime.MORE_THAN_15 ? "btn btn-filter" : "btn-outline btn-filter"}
                    onClick={() => setTimeFilter(StudyTime.MORE_THAN_15)}>{StudyTime.MORE_THAN_15}</button>
            </div>
            <Checkbox title="Есть тест" callback={setHasTest}/>
            <button className="btn" onClick={onResetFilter}>Сбросить</button>
        </div>
    )
}