import {IContentBlock} from "./IContentBlock";

export interface ICourseType {
    id: string;

    directionId: string;
    hasTest: boolean;

    title: string;
    content: IContentBlock[];
    studyTime:string;

    image: string;
}