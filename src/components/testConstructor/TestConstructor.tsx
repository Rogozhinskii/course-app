import React, {ChangeEvent, useCallback, useState} from "react";
import {v1} from "uuid";
import "./style.css"
import {ITestConstructorProps} from "../../interfaces/ITestConstructorProps";
import {IQuestion} from "../../interfaces/IQuestion";


export const TestConstructor = (props: ITestConstructorProps) => {
    const [testTitle, setTestTitle] = useState<string>("");
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    const addQuestion = () => {
        debugger
        const newQuestion: IQuestion = {
            id: v1(),
            question: "",
            answers: ["", "", "", ""],
            correctIndex: 0,
        };
        const updated = [...questions, newQuestion];
        setQuestions(updated);
        props.addQuestions(updated);
    };

    const onTestTitleChanged = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const newTitle = e.target.value;
        setTestTitle(newTitle);
        props.updateTestTitle(newTitle)
    }, [props.updateTestTitle]);

    const updateQuestionText = (id: string, value: string) => {
        const copy = [...questions]
        const updated = copy.map((q: IQuestion): IQuestion => (q.id === id ? {...q, question: value} : q))
        setQuestions(updated);
        props.addQuestions(updated);
    };

    const updateAnswer = (qid: string, index: number, value: string) => {

        const copy: IQuestion[] = [...questions]
        const updated = copy.map((q): IQuestion =>
            q.id === qid
                ? {
                    ...q,
                    answers: q.answers.map((a, i) => (i === index ? value : a)),
                }
                : q
        )
        setQuestions(updated);
        props.addQuestions(updated);
    };

    const setCorrect = (qid: string, index: number) => {
        const copy: IQuestion[] = [...questions]
        const updated = copy.map((q): IQuestion => (q.id === qid ? {...q, correctIndex: index} : q))
        setQuestions(updated);
        props.addQuestions(updated);
    };

    return (
        <div className="test-constructor">
            <h2 className="test-constructor__title">Конструктор теста</h2>
            <input
                type="text"
                className="input-field"
                placeholder="Введите тему теста..."
                value={testTitle}
                onChange={onTestTitleChanged}
            />


            <button className="add-btn" onClick={addQuestion}>
                + Добавить вопрос
            </button>

            {questions.map((q, index) => (
                <div key={q.id} className="question-block">
                    <input
                        type="text"
                        className="input-field"
                        placeholder={`Вопрос ${index + 1}`}
                        value={q.question}
                        onChange={(e) => updateQuestionText(q.id, e.target.value)}
                    />

                    {q.answers.map((a, index) => (
                        <div key={index} className="answer-row">
                            <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctIndex === index}
                                onChange={() => setCorrect(q.id, index)}
                            />
                            <input
                                type="text"
                                className="input-field"
                                placeholder={`Вариант ${index + 1}`}
                                value={a}
                                onChange={(e) => updateAnswer(q.id, index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};