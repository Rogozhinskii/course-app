import {StudyTime} from "../../interfaces/StudyTime";
import React, {ChangeEvent, useCallback} from "react";
import "./style.css"


export interface IStudyTimeRadioGroupProps {
    onChange: (studyTime: StudyTime) => void;
}


export const StudyTimeRadioGroup = React.memo ((props: IStudyTimeRadioGroupProps) => {

    const [studyTime, setStudyTime] = React.useState<StudyTime>(StudyTime.LESS_THAN_15)

    const onRadioChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value as StudyTime;
        setStudyTime(newValue)
        props.onChange(newValue)
    },[props.onChange])

    return (
        <div className="radio-group">
            <label htmlFor="timeChoice1" className="radio-option">
                <input type="radio"
                       id="timeChoice1"
                       name="timeChoice"
                       value={StudyTime.LESS_THAN_15}
                       checked={studyTime === StudyTime.LESS_THAN_15}
                       onChange={onRadioChangeHandler}
                />
                Менее 15 минут
            </label>

            <label htmlFor="timeChoice2" className="radio-option">
                <input type="radio"
                       id="timeChoice2"
                       name="timeChoice"
                       value={StudyTime.MORE_THAN_15}
                       checked={studyTime === StudyTime.MORE_THAN_15}
                       onChange={onRadioChangeHandler}
                />
                Более 15 минут
            </label>
        </div>
    )
})