import {ICreateQuestionDto} from "./ICreateQuestionDto";

export interface ICreateCustomTestDto {
    courseId: string;
    title: string;
    questions: ICreateQuestionDto[]
}

