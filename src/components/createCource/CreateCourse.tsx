import React, {ChangeEvent, useCallback} from "react";
import "./style.css"
import {Checkbox} from "../checkbox/Checkbox";
import {TestConstructor} from "../testConstructor/TestConstructor";
import saveIcon from "./../../img/icons/save.svg"
import {StudyTime} from "../../interfaces/StudyTime";
import {StudyTimeRadioGroup} from "../studyTimeRadioGroup/StudyTimeRadioGroup";
import {IQuestion} from "../../interfaces/IQuestion";
import {useAppDispatch} from "../../state/store";
import {createCustomTest} from "../../state/customTest-reducer";
import {v1} from "uuid";
import {ICourseDirection} from "../../interfaces/ICourseDirection";
import {DirectionSelector} from "../directionSelector/DirectionSelector";


export const CreateCourse = () => {

    const [name, setName] = React.useState<string>("");
    const [courseMaterial, setCourseMaterial] = React.useState<string>("");
    const [direction, setDirection] = React.useState<ICourseDirection | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isTestRequired, setIsTestRequired] = React.useState(false);
    const [questions, setQuestions] = React.useState<IQuestion[]>([]);
    const [testTitle, setTestTitle] = React.useState<string>("");

    const dispatch = useAppDispatch();


    const [studyTime, setStudyTime] = React.useState<StudyTime>(StudyTime.LESS_THAN_15)

    const onRadioChangeHandler = (studyTime: StudyTime) => {
        setStudyTime(studyTime)
    }

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
        setCourseMaterial(e.currentTarget.value)
    }



    const setCourseDirections = useCallback((direction: ICourseDirection) => {
        setDirection(direction)
    }, [])

    const onSaveHandler = (): boolean => {
        debugger


        dispatch(createCustomTest(v1(), testTitle, questions))
        //navigate("/courses")

        // setError("Field is required!")
        return true;
    }

    const addQuestions = (questions: IQuestion[]): void => {
        setQuestions(questions)
    }

    const updateTestTitle = (testTitle: string): void => {
        setTestTitle(testTitle)
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
                            <DirectionSelector setCourseDirection={setCourseDirections}/>
                            {error && <div className="error-message">{error}</div>}
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Информация</h3>

                            <textarea className={getInputStyle()}
                                      value={courseMaterial}
                                      placeholder="Начните вводить..."
                                      rows={10}
                                      onChange={onTextAreaChangeHandler}
                            />
                            {error && <div className="error-message">{error}</div>}
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Время изучения</h3>
                            <StudyTimeRadioGroup onChange={onRadioChangeHandler}/>

                        </li>
                        <li className="input-data-list__item">
                            <Checkbox title="Добавить тест" callback={res => setIsTestRequired(res)}/>
                        </li>
                    </ul>
                    {isTestRequired && <TestConstructor addQuestions={addQuestions} updateTestTitle={updateTestTitle}/>}
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