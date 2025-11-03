import React from "react";
import "./style.css"

export interface ICheckboxProps {
    title?: string;
    callback?: (checked: boolean) => void;
}

export const Checkbox = (props: ICheckboxProps) => {
    const [checked, setChecked] = React.useState(false);

    const onClickHandler = () => {
        let state = !checked;
        setChecked(state);
        if (props.callback) {
            props.callback(state);
        }
    }

    return (
        <div className="checkbox-wrapper" onClick={onClickHandler}>
            <input
                type="checkbox"
                checked={checked}
                onChange={()=>{}}
            />
            <span className="checkmark"></span>
            <span className="label-text">{props.title}</span>
        </div>
    )
}