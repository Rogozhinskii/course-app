import React, {ChangeEvent} from "react";
import "./style.css"
import {Checkbox} from "../checkbox/Checkbox";
import {Question, TestConstructor} from "../testConstructor/TestConstructor";
import saveIcon from "./../../img/icons/save.svg"
import {useNavigate} from "react-router-dom";

export const CreateCourse = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState<string>("");
    const [text, setText] = React.useState<string>("");
    const [theme, setTheme] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>(null);
    const [checked, setChecked] = React.useState(false);

    const [questions, setQuestions] = React.useState<Question[]>([]);

    const getInputStyle = (): string => {
        return error ? "input-field error" : "input-field";
    }
    const onKeyUpHandler = () => {
        if (error != null) {
            setError(null);
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setName(e.currentTarget.value)
    }

    const onTextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setError(null)
        setText(e.currentTarget.value)
    }

    const themes: string[] = [
        "Программирование",
        "Дизайн",
        "Маркетинг",
        "Кино"
    ]

    function onThemeChangeHandler() {

    }

    const onSaveHandler = (): boolean => {
        navigate("/courses")

        // setError("Field is required!")
        return true;
    }


    return (
        <main className="section">
            <div className="container">
                <h2 className="title-1">Создать материал</h2>
                <div className="create-course-wrapper">
                    <ul className="input-data-list">
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Название</h3>
                            <input type="text"
                                   className={getInputStyle()}
                                   value={name}
                                   placeholder="Начните вводить..."
                                   onChange={onChangeHandler}
                                   onKeyUp={onKeyUpHandler}
                            />
                            {error && <div className="error-message">{error}</div>}
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Тематика</h3>
                            <select className={getInputStyle()}
                                    value={theme}
                                    onChange={onThemeChangeHandler}>
                                <option value="">Выберите тематику...</option>
                                {
                                    themes.map((x) => <option key={x} value={x}>{x} </option>)
                                }
                            </select>
                            {error && <div className="error-message">{error}</div>}
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Информация</h3>

                            <textarea className={getInputStyle()}
                                      value={text}
                                      placeholder="Начните вводить..."
                                      rows={10}
                                      onChange={onTextAreaChangeHandler}
                            />
                            {error && <div className="error-message">{error}</div>}
                        </li>
                        <li className="input-data-list__item">
                            <Checkbox title="Добавить тест" callback={res => setChecked(res)}/>
                        </li>
                    </ul>
                    {checked && <TestConstructor addQuestions={setQuestions}/>}
                    <div className="save-btn">
                        <button className="btn"
                                onClick={onSaveHandler}>
                            Сохранить
                            <img src={saveIcon} alt="icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}