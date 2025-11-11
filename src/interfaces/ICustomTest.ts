import {IQuestion} from "./IQuestion";

export interface ICustomTest {
    id: number;
    courseId: string;
    title: string;
    questions: IQuestion[];
}