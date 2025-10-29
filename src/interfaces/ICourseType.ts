export interface ICourseType {
    id: string;

    directionId: string;
    testId?: string;

    title: string;
    content: string;
    studyTime:string;

    image: string;
}