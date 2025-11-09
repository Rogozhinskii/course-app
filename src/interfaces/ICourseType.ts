import {IContentBlock} from "./IContentBlock";

export interface ICourseType {
    id: string;

    directionId: number;
    hasTest: boolean;

    title: string;
    content: IContentBlock[];
    studyTime:string;

    image: string;
}