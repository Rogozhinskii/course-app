import "./style.css"
import {useState} from "react";
import {Checkbox} from "../checkbox/Checkbox";

type FilterDirectionType = {
    name: string,
}

type TimeFilterType = "all" | "less" | "more";

interface IFilterProps {
    timeFilter: TimeFilterType
    hasTest: boolean
}

export const Filter = (props: IFilterProps) => {

    const less = "<15 m"
    const more = ">15 m"
    const [directions, setDirections] = useState<FilterDirectionType[]>([
        {
            name: 'Программирование',
        },
        {
            name: "Дизайн"
        },
        {
            name: "Маркетинг"
        },
        {
            name: "Кино"
        }
    ])


    return (
        <div className="filter-container">
            <h3 className="filter-title">Поиск материалов</h3>
            <ul className="filter-directions">
                {
                    directions.map((d: FilterDirectionType) => {
                        return <li role="button" className="filter-direction">{d.name}</li>
                    })
                }
            </ul>
            <h5 className="filter-title">Время прочтения</h5>
            <div className="time-filter">
                <button className={props.timeFilter === "all" ? "btn btn-filter" : "btn-outline btn-filter"}>All
                </button>
                <button
                    className={props.timeFilter === "less" ? "btn btn-filter" : "btn-outline btn-filter"}>{less}</button>
                <button
                    className={props.timeFilter === "more" ? "btn btn-filter" : "btn-outline btn-filter"}>{more}</button>
            </div>
            <Checkbox title="Есть тест"/>
        </div>
    )
}