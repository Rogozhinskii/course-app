import React, {useCallback, useEffect, useState} from "react";
import {ITextAreaProps} from "../../interfaces/ITextFieldProps";
import {requestCoursesDirections} from "../../state/courses-reducer";

export const TextArea = (props: ITextAreaProps) => {

    const externalError: string|null = props.error ?? null;
    const errorMessage: string = externalError ?? "Выберите тематику"
    const placeHolder = "Начните вводить..."
    const [error, setError] = useState<string | null>(externalError);
    const [text, setText] = useState<string>("");


    useEffect(() => {
        setError(externalError);
    }, [externalError]);

    const onChangeHandler = useCallback ((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if(!value.trim()){
            setError(errorMessage);
            setText("");
            return;
        }
        setError(null);
        setText(value);
        props.onContentChanged(value);
    }, [props.onContentChanged]);

    return (
        <>
            <textarea className={error ? "input-field error" : "input-field"}
                      value={text}
                      placeholder={placeHolder}
                      rows={props.rows}
                      onChange={onChangeHandler}
            />
            {error && <div className="error-message">{error}</div>}
        </>
    )
}