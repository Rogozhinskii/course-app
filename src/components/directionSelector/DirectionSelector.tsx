import React, { useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {requestCoursesDirections} from "../../state/courses-reducer";
import {ICourseDirection} from "../../interfaces/ICourseDirection";

export interface IDirectionSelectorProps {
    setCourseDirection: (direction: ICourseDirection) => void;
}

export const DirectionSelector = (props: IDirectionSelectorProps) => {

    const dispatch = useAppDispatch();
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const directions = useAppSelector(state => state.coursesState.directions);

    useEffect(() => {

        dispatch(requestCoursesDirections())
    }, [dispatch]);

    const onDirectionChanged = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {

        const value = e.target.value.trim()
        if (!value) {
            setError("Field is required!")
            setSelectedValue("")
            return;
        }
        setError(null)
        setSelectedValue(value)
        const selectedDirection = directions.find(x => x.name === value)
        if (selectedDirection) {
            props.setCourseDirection(selectedDirection)
        } else {
            setError("Field is required!")
        }
    }, [props.setCourseDirection, directions])

    return (
        <>
            <select className={error ? "input-field error" : "input-field"}
                    value={selectedValue}
                    onChange={onDirectionChanged}>
                <option value="">Выберите тематику...</option>
                {
                    directions.map((x) => <option key={x.id} value={x.name}>{x.name} </option>)
                }
            </select>
            {
                error && <div className="error-message">{error}</div>
            }
        </>

    )
}