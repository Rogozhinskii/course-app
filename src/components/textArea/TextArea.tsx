import React, {useCallback, useState} from "react";
import {ITextAreaProps} from "../../interfaces/ITextFieldProps";

export const TextArea = (props: ITextAreaProps) => {

    const placeHolder = "Начните вводить..."
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState<string>("");

    const onChangeHandler = useCallback ((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.trim();
        if(!value){
            setError("Field is required!");
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