import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {requestCoursesDirections} from "../../state/courses-reducer";

export interface IDirectionSelectorProps {
    onDirectionIdChanged: (directionId: string) => void;
    error?: string;
}

export const DirectionSelector = (props: IDirectionSelectorProps) => {

    const externalError: string|null = props.error ?? null;
    const errorMessage: string = "Выберите тематику"
    const dispatch = useAppDispatch();
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [error, setError] = useState<string | null>(externalError);

    const directions = useAppSelector(state => state.coursesState.directions);

    useEffect(() => {
        setError(externalError);
        dispatch(requestCoursesDirections())
    }, [dispatch, externalError]);

    const onDirectionChanged = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {

        const value = e.target.value.trim()
        if (!value) {
            setError(errorMessage)
            setSelectedValue("")
            return;
        }
        setError(null)
        setSelectedValue(value)
        const selectedDirection = directions.find(x => x.name === value)
        if (selectedDirection) {
            props.onDirectionIdChanged(selectedDirection.id)
        } else {
            setError(errorMessage)
        }
    }, [props.onDirectionIdChanged, directions])

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