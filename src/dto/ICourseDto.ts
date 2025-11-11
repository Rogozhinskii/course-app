import {IContentBlock} from "../interfaces/IContentBlock";

export interface ICourseDto {
    id: string;
    title: string;
    studyTime: string;
    image: string;
    directionId: number;
    hasTest: boolean;
    courseContent: IContentBlock[]
}