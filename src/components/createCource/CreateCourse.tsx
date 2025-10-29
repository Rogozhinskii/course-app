import React, {useCallback} from "react";
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
import {TextArea} from "../textArea/TextArea";
import {TextField} from "../textField/TextField";
import "./style.css"
import {ImageInput} from "../imageInput/ImageInput";


export const CreateCourse = () => {

    const [courseName, setCourseName] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");
    const [direction, setDirection] = React.useState<ICourseDirection | null>(null);

    const [isTestRequired, setIsTestRequired] = React.useState(false);
    const [questions, setQuestions] = React.useState<IQuestion[]>([]);
    const [testTitle, setTestTitle] = React.useState<string>("");
    const [coverImg, setCoverImg] = React.useState<string>("");

    const dispatch = useAppDispatch();

    const [studyTime, setStudyTime] = React.useState<StudyTime>(StudyTime.LESS_THAN_15)

    const setCourceStudyTime = (studyTime: StudyTime) => {
        setStudyTime(studyTime)
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
                            <TextField onContentChanged={setCourseName}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Тематика</h3>
                            <DirectionSelector setCourseDirection={setCourseDirections}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Информация</h3>
                            <TextArea onContentChanged={setContent} rows={10}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Время изучения</h3>
                            <StudyTimeRadioGroup onChange={setCourceStudyTime}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Обложка</h3>
                            <ImageInput onContentChanged={setCoverImg}/>
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