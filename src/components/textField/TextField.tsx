import React, {useCallback, useState, KeyboardEvent, ChangeEvent, useEffect} from "react";
import {ITextFieldProps} from "../../interfaces/ITextFieldProps";


export const TextField =(props: ITextFieldProps) =>{

    const externalError: string|null = props.error ?? null;
    const errorMessage: string = externalError ?? "Введите название курса"
    const placeHolder = "Начните вводить..."
    const [error, setError] = useState<string | null>(props.error ?? null);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        setError(externalError);
    }, [props.error, externalError]);

    const onChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if(!value){
            setError(errorMessage);
            setText("");
            return;
        }
        setError(null);
        setText(value);
        props.onContentChanged(value);
    }, [props.onContentChanged]);

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(props.onKeyUp){
            props.onKeyUp(e.key);
        }
    }


    return (
        <>
            <input type="text"
                   className={error ? "input-field error" : "input-field"}
                   value={text}
                   placeholder={placeHolder}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}

            />
            {error && <div className="error-message">{error}</div>}
        </>
    )
}