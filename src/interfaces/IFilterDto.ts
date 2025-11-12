import {TimeFilterType} from "../components/filter/Filter";

export interface IFilterDto {
    studyTime?: TimeFilterType;
    directionId?: number;
    hasTest?: boolean;
}