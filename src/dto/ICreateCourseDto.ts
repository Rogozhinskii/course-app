import {ICreateCourseContentDto} from "./ICreateCourseContentDto";

export interface ICreateCourseDto {
    title: string;
    studyTime: string;
    directionId: number;
    authorId: number;
    courseContent: ICreateCourseContentDto[]
}
