import {IHasId} from "../dto/IHasId";

export interface IContentBlock extends IHasId {
    title: string;
    content: string;
}