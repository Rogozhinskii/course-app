import React, {useState} from "react";
import {v1} from "uuid";
import "./style.css"


export type Question = {
    id: string;
    text: string;
    answers: string[];
    correctIndex: number;
}

export interface ITestConstructorProps {
    addQuestions: (questions: Question[]) => void;
}

export const TestConstructor = (props: ITestConstructorProps) => {
    const [testTitle, setTestTitle] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([]);

    const addQuestion = () => {
        const newQuestion: Question = {
            id: v1(),
            text: "",
            answers: ["", "", "", ""],
            correctIndex: 0,
        };
        setQuestions([...questions, newQuestion]);
        props.addQuestions(questions);
    };

    const updateQuestionText = (id: string, value: string) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? {...q, text: value} : q))
        );
    };

    const updateAnswer = (qid: string, index: number, value: string) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === qid
                    ? {
                        ...q,
                        answers: q.answers.map((a, i) => (i === index ? value : a)),
                    }
                    : q
            )
        );
    };

    const setCorrect = (qid: string, index: number) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === qid ? {...q, correctIndex: index} : q))
        );
    };

    return (
        <div className="test-constructor">
            <h2 className="test-constructor__title">Конструктор теста</h2>
            <input
                type="text"
                className="input-field"
                placeholder="Введите тему теста..."
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
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
                        value={q.text}
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