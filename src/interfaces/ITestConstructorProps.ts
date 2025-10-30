import {IQuestion} from "./IQuestion";

export interface ITestConstructorProps {
    addQuestions: (questions: IQuestion[]) => void;
    updateTestTitle: (title: string) => void;
    error?:string
}