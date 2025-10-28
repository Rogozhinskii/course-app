import {IQuestion} from "./IQuestion";

export interface ICustomTest {
    id: string;
    courseId: string;
    title: string;
    questions: IQuestion[];
}