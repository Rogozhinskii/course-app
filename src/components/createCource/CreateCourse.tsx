import React, {useCallback, useState} from "react";
import {Checkbox} from "../checkbox/Checkbox";
import {TestConstructor} from "../testConstructor/TestConstructor";
import saveIcon from "./../../img/icons/save.svg"
import {StudyTime} from "../../interfaces/StudyTime";
import {StudyTimeRadioGroup} from "../studyTimeRadioGroup/StudyTimeRadioGroup";
import {IQuestion} from "../../interfaces/IQuestion";
import {useAppDispatch} from "../../state/store";
import {DirectionSelector} from "../directionSelector/DirectionSelector";
import {TextField} from "../textField/TextField";
import "./style.css"
import {ImageInput} from "../imageInput/ImageInput";
import {requestCreateCourse} from "../../state/courses-reducer";
import {useNavigate} from "react-router-dom";
import {TextBlockEditor} from "../textBlocksEditor/TextBlockEditor";
import {IContentBlock} from "../../interfaces/IContentBlock";


export const CreateCourse = () => {
    const navigate = useNavigate()
    const [courseTitle, setCourseTitle] = useState<string>("");
    const [blocks, setBlocks] = useState<IContentBlock[]>([])
    const [directionId, setDirectionId] = useState<string>("");

    const [hasTest, setHasTest] = useState(false);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [testTitle, setTestTitle] = useState<string>("");
    const [coverImg, setCoverImg] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [studyTime, setStudyTime] = React.useState<StudyTime>(StudyTime.LESS_THAN_15)
    const dispatch = useAppDispatch();


    const setCourseStudyTime = (studyTime: StudyTime) => {
        setStudyTime(studyTime)
    }

    const onDirectionIdChanged = useCallback((directionId: string) => {
        setDirectionId(directionId)
    }, [])

    const onSaveHandler = (): void => {

        if (!validateData()) {
            return;
        }
        dispatch(requestCreateCourse(directionId, courseTitle, blocks, studyTime, coverImg, hasTest, testTitle, questions))
        navigate("/courses")

    }

    const validateData = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!courseTitle.trim()) newErrors.courseTitle = "Введите название курса";
        if (!directionId.trim()) newErrors.direction = "Выберите тематику";
        if (!coverImg.trim()) newErrors.coverImg = "Выберите изображение";
        if (blocks.length === 0) newErrors.blocks = "Блоки информации должны быть заполнены";

        if (hasTest) {
            if (!testTitle.trim()) newErrors.testTitle = "Введите название теста";
            if (questions.length === 0)
                newErrors.questions = "Добавьте хотя бы один вопрос";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


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
                            <TextField onContentChanged={setCourseTitle} error={errors.courseTitle}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Тематика</h3>
                            <DirectionSelector onDirectionIdChanged={onDirectionIdChanged} error={errors.direction}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Информация</h3>
                            <TextBlockEditor onContentChanged={setBlocks} error={errors.content}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Время изучения</h3>
                            <StudyTimeRadioGroup onChange={setCourseStudyTime}/>
                        </li>
                        <li className="input-data-list__item">
                            <h3 className="input-data-list__item__title ">Обложка</h3>
                            <ImageInput onContentChanged={setCoverImg} error={errors.coverImg}/>
                        </li>
                        <li className="input-data-list__item">
                            <Checkbox title="Добавить тест" callback={res => setHasTest(res)}/>
                        </li>
                    </ul>
                    {hasTest && <TestConstructor addQuestions={addQuestions} updateTestTitle={updateTestTitle}
                                                 error={errors.testTitle}/>}
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