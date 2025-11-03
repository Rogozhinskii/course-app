import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {requestCustomTests} from "../../state/customTest-reducer";
import {ICustomTest} from "../../interfaces/ICustomTest";
import "./style.css"

interface ICustomTestProps {
    courseId: string;
}

export const CustomTest = (props: ICustomTestProps) => {
    const dispatch = useAppDispatch();
    const tests = useAppSelector(state => state.customTestsState.customTests);
    const target = tests.find((t: ICustomTest) => t.courseId === props.courseId);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {
        if (tests.length === 0) {
            dispatch(requestCustomTests())
        }
    }, [props.courseId, dispatch, tests.length]);

    const selectAnswerHandler = (questionId: string, answerIndex: number) => {
        setSelectedAnswers((prev) => ({...prev, [questionId]: answerIndex}));
    }

    const checkResultsHandler = () => {
        let correctCount = 0;
        target?.questions.forEach((q) => {
            if(selectedAnswers[q.id] === q.correctIndex){
                correctCount++;
            }
        })
        setResult(correctCount);
    }

    const resetTest = () => {
        setSelectedAnswers({});
        setResult(null);
    }

    return (
        <div className="test-container">
            <h2 className="test-title">{target?.title}</h2>
            <div>
                {target?.questions.map((q, index) => (
                    <div key={q.id} className="question-block">
                        <h3 className="question">
                            {index + 1}. {q.question}
                        </h3>

                        {q.answers.map((answer, answerIndex) => {
                            const isSelected = selectedAnswers[q.id] === answerIndex;

                            return (
                                <div key={answerIndex} className="answer-row">
                                    <input
                                        type="radio"
                                        name={`questions-${q.id}`}
                                        checked={isSelected}
                                        onChange={() => selectAnswerHandler(q.id, answerIndex)}
                                    />
                                    <label>
                                        {answer}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            {
                result === null ? (
                    <button className="btn" onClick={checkResultsHandler}>
                        Проверить результаты
                    </button>
                ) : (
                    <div className="test-result">
                        <p>Правильных ответов: {result} из {target?.questions.length}</p>
                        <button className="btn" onClick={resetTest}>
                            Пройти заново
                        </button>
                    </div>
                )
            }

        </div>
    )
}